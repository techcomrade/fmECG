defmodule ServerChatWeb.MessagesController do
  use ServerChatWeb, :controller
  
  def get_all_messages(conn, params) do
    json conn, %{success: true, message: "get_all_messages"}
  end
end
