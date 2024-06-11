defmodule ServerChatWeb.ConversationsController do
  use ServerChatWeb, :controller
  
  alias ServerChat. { Conversations, Repo }
  
  def test(conn, _params) do
    json conn, %{success: true, message: "hi pro"}
  end
  
  def create_conversation(conn, params) do
    user_ids = params["user_ids"]
    IO.inspect(user_ids, label: "dsnkjdfgfd")
 
    response = cond do
      user_ids == nil -> %{success: false, message: "LOUI", error_code: 001} # Lack of user ids
      length(user_ids) != 2 -> %{success: false, message: "NOUINT", error_code: 002} # Number of user is not true
      true -> 
        # TODO:
        # validate thêm: để được add vào bảng cần check lại xem 2 user id có tồn tại không
        # kiểm tra xem bảng conversation chứa 2 user này được tạo chưa

        %Conversations{
          user_ids: user_ids,
        } 
        |> Repo.insert
        |> case do
          {:ok, conversation} -> %{success: true, message: "Create conversation successfully", conversation: conversation.user_ids}
          _ -> %{success: false, message: "EWCC", error_code: 003} # Error when create conversation
        end
    end
    json conn, response
  end
end
