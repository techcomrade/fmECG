defmodule ServerChatWeb.MessageChannel do
  use Phoenix.Channel

  def join("message:" <> _user_id, _message, socket) do
    {:ok, socket}
  end

  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end
end
