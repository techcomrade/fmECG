defmodule ServerChatWeb.UserSocket do
  use Phoenix.Socket
  @impl true
  
  channel "message:*",               ServerChatWeb.MessageChannel
  

  def connect(params, socket, _connect_info) do
    IO.inspect(params, label: "gndfgnkdfgjkdfg")
    {:ok, socket}
  end

  # Socket IDs are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     Elixir.ServerChatWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  @impl true
  def id(_socket), do: nil
end
