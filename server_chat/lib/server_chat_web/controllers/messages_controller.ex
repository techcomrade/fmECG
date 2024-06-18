defmodule ServerChatWeb.MessagesController do
  use ServerChatWeb, :controller

  import Ecto.Query
  alias Postgrex.Messages
  alias ServerChat.{Repo, Messages, ConversationMembers, Utils.Helper}

  def get_all_messages(conn, params) do
    conversation_id = params["conversation_id"]

    response =
      cond do
        conversation_id == nil ->
          Helper.response_json_message(false, "CNFC", 103)

        true ->
          messages = from(m in Messages, 
            where: m.conversation_id == ^conversation_id,
            order_by: [desc: m.inserted_at],
            select: %{
              message_id: m.id,
              attachments: m.attachments,
              system_message: m.system_message,
              pin: m.pin,
              pin_time: m.pin_time,
              reactions: m.reactions
            }
          )
          |> Repo.all

          %{success: true, message: "Get all messages successfully", data: messages}
      end

    json(conn, response)
  end

  def create_message(conn, params) do
    user_id = conn.assigns.user.user_id
    conversation_id = params["conversation_id"]
    system_message = params["system_message"] || false
    attachments = params["attachments"]

    # TODO: quy định attachments như thế nào?

    response =
      cond do
        conversation_id == nil ->
          Helper.response_json_message(false, "YDSC", 100)

        true ->
          id = :crypto.strong_rand_bytes(18) |> Base.url_encode64()

          %Messages{
            id: id,
            conversation_id: conversation_id,
            sender_id: user_id,
            system_message: system_message,
            attachments: attachments
          }
          |> Repo.insert()
          |> case do
            {:ok, message} ->
              data =
                Map.take(message, [
                  :id,
                  :conversation_id,
                  :sender_id,
                  :attachments,
                  :system_message,
                  :pin,
                  :pin_time,
                  :reactions,
                  :inserted_at
                ])

              cm_ids = get_conversation_member_ids(conversation_id)

              Enum.each(cm_ids, fn id ->
                ServerChatWeb.Endpoint.broadcast("message:#{id}", "new_message_conversation", %{
                  "data" => data
                })
              end)

              Helper.response_json_message(true, "Send message successfully")

            _ ->
              Helper.response_json_message(false, "CME", 102)
          end
      end

    json(conn, response)
  rescue
    _ -> json(conn, Helper.response_json_message(false, "CCM", 101))
  end

  defp get_conversation_member_ids(conversation_id) do
    from(cm in ConversationMembers,
      where: cm.conversation_id == ^conversation_id,
      select: cm.user_id
    )
    |> Repo.all()
  end
end
