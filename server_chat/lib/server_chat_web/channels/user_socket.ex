defmodule ServerChatWeb.UserSocket do
  use Phoenix.Socket
  alias ServerChat. {  Utils.Helper }

  @impl true
  
  channel "message:*",               ServerChatWeb.MessageChannel

  def connect(params, socket, _connect_info) do
    token = params["token"] || ""
    case Helper.validate_token(token) do
      {true, payload, _} ->
        user = Map.put(%{}, :user_id, payload.fields["account_id"])
        {:ok, assign(socket, :user, user)}
      _ -> :error
    end
  end

  @impl true
  def id(_socket), do: nil
end
