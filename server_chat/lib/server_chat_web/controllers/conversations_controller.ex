defmodule ServerChatWeb.ConversationsController do
  use ServerChatWeb, :controller
  
  alias ServerChat. { Repo, Conversations, ConversationMembers }
  
  def test(conn, _params) do
    json conn, %{success: true, message: "hi pro"}
  end
  
  def create_conversation(conn, params) do
    creator_id = conn.assigns.user.user_id |> IO.inspect(label: "gsnkjdfgd")
    type_conversation = params["type"] # 0: 2 person, 1: group, 2: chatbot
    name = params["name"]
		other_id = params["user_id"]
 
    response = cond do
      type_conversation == nil -> %{success: false, message: "LOTC", error_code: 001} # Lack of type conversation
			other_id == nil || creator_id == nil -> %{success: false, message: "LOU", error_code: 002} # Lack of user
      true ->     
        Repo.transaction(fn -> 
          {:ok, conversation} = %Conversations{
            name: name,
            type: type_conversation
          } |> Repo.insert

					# TODO: làm thế nào để kiểm tra 2 người đã tạo conversation chưa?
					# TODO: làm thế nào để kiểm tra user_id có hợp lệ hay không? gọi api qua server-web?
          %ConversationMembers{
            conversation_id: conversation.id,
            user_id: creator_id,
            seen: false 
          } |> Repo.insert
					
					%ConversationMembers{
            conversation_id: conversation.id,
            user_id: other_id,
            seen: false 
          } |> Repo.insert

        end)
				|> case do
					{:ok, _} -> %{success: true, message: "Create conversation with members successfully"}
					_ -> 	%{success: false, message: "Create conversation failed, try again", error_code: 003}
				end
    end
    json conn, response
  rescue
    _ -> json conn, %{success: false, message: "Cannot create conversations", error_code: 004}
  end
end
