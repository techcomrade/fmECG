defmodule ServerChatWeb.ConversationsController do
  use ServerChatWeb, :controller

  alias ServerChat.{Repo, Conversations, ConversationMembers, Utils.Helper}
  import Ecto.Query

  def test(conn, _params) do
    json(conn, %{success: true, message: "hi pro"})
  end

  def get_all_conversation_by_user_id(conn, _params) do
    user_id = conn.assigns.user.user_id

    conversations_query = from cm in ConversationMembers,
      join: c in Conversations, on: cm.conversation_id == c.id,
      where: cm.user_id == ^user_id,
      select: %{
        conversation_id: c.id,
        name: c.name,
        type: c.type,
        avatar_url: c.avatar_url,
        user_id: cm.user_id
      }

    conversation_list = Repo.all(conversations_query)

    json(conn, %{success: true, message: "Get all conversations by user ID successfully", data: conversation_list})
  end

  def create_conversation(conn, params) do
    creator_id = conn.assigns.user.user_id
    # 0: 2 person, 1: group, 2: chatbot
    type_conversation = params["type"]
    name = params["name"]
    other_id = params["user_id"]

    response =
      cond do
        # Lack of type conversation
        type_conversation == nil ->
          %{success: false, message: "LOTC", error_code: 001}

        # Lack of user
        other_id == nil || creator_id == nil ->
          %{success: false, message: "LOU", error_code: 002}

        Repo.get(Conversations, Helper.hash_conversation_id([creator_id, other_id])) ->
          # Conversation has existed
          %{success: false, message: "Conversation has existed", error_code: 005}

        true ->
          Repo.transaction(fn ->
            {:ok, conversation} =
              %Conversations{
                id: Helper.hash_conversation_id([creator_id, other_id]),
                name: name,
                type: type_conversation
              }
              |> Repo.insert()

            # TODO: làm thế nào để kiểm tra user_id có hợp lệ hay không? gọi api qua server-web?
            %ConversationMembers{
              conversation_id: conversation.id,
              user_id: creator_id,
              role: 0,
              seen: false
            }
            |> Repo.insert()

            %ConversationMembers{
              conversation_id: conversation.id,
              user_id: other_id,
              seen: false
            }
            |> Repo.insert()
          end)
          |> case do
            {:ok, _} ->
              %{success: true, message: "Create conversation with members successfully"}

            _ ->
              %{success: false, message: "Create conversation failed, try again", error_code: 003}
          end
      end

    json(conn, response)
  rescue
    _ -> json(conn, %{success: false, message: "Cannot create conversations", error_code: 004})
  end
end
