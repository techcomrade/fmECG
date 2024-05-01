defmodule ServerChatWeb.MessageChannel do
  use Phoenix.Channel

  def join("message:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("message:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end
  
  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast!(socket, "new_msg", %{body: body})
    {:noreply, socket}
  end
end
