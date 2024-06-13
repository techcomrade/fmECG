defmodule ServerChatWeb.MessagesController do
  use ServerChatWeb, :controller
  
  def get_all_messages(conn, _params) do
    json conn, %{success: true, message: "get_all_messages"}
  end
	
	def create_message(conn, params) do
		user_id = conn.assigns.user.user_id
		json conn, %{success: true, message: "testing"}
	end
end
