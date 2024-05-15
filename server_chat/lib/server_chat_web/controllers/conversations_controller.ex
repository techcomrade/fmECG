defmodule ServerChatWeb.ConversationsController do
  use ServerChatWeb, :controller
  
  def get_conversation_by_id(conn, _params) do
    json conn, %{success: true, message: "hi pro"}
  end
  
  def post_conversations(conn, _params) do
    json conn, %{success: true, message: "hi pro post"}
  end
end
