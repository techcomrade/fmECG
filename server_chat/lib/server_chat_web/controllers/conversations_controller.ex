defmodule ServerChatWeb.ConversationsController do
  use ServerChatWeb, :controller
  
  alias ServerChat. { Repo, Conversations, ConversationMembers }
  
  def test(conn, _params) do
    json conn, %{success: true, message: "hi pro"}
  end
  
  def create_conversation(conn, params) do
    creator_id = conn.assigns.user.user_id
    type_conversation = params["type"] # 0: 2 person, 1: group, 2: chatbot 
    name = params["name"]
 
    response = cond do
      type_conversation == nil -> %{success: false, message: "LOTC", error_code: 001} # Lack of type conversation

      true ->
        %Conversations{
          name: name,
          type: type_conversation
        } 
        |> Repo.insert
        |> case do
          {:ok, conversation} -> 
            %ConversationMembers{
              conversations_id: conversation.id,
              user_id: creator_id,
              seen: false 
            }
            %{success: true, message: "Create conversation successfully", conversation: conversation.id}
          _ -> %{success: false, message: "EWCC", error_code: 003} # Error when create conversation
        end
        
        Repo.transaction(fn -> 
          {:ok, conversation} = %Conversations{
            name: name,
            type: type_conversation
          } |> Repo.insert
          
          %ConversationMembers{
            conversations_id: conversation.id,
            user_id: creator_id,
            seen: false 
          } |> Repo.insert
          
          
          
        end)
    end
    json conn, response
  rescue
    _ -> json conn, %{success: false, message: "Cannot create conversations", error_code: 004}
  end
end
