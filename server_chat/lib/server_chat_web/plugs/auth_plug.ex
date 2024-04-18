defmodule ServerChatWeb.AuthPlug do
  alias Plug. { Conn }
  
  def init(_) do end

  def call(conn, options) do
    conn
    |> IO.inspect(label: "fsdffsdfsdf")
  end
end
