defmodule ServerChat.Utils.Helper do
  def validate_token(token) do
    Application.get_env(:server_chat, ServerChatWeb.Endpoint)[:secret_key_base]
    # phải có from_oct để key không bị đổi thành bytes
    |> JOSE.JWK.from_oct
    |> JOSE.JWT.verify(token)
    # nếu token được validate -> matching : {true, payload, jws}
  end
end
