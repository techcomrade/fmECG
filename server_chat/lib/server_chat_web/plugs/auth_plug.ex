defmodule ServerChatWeb.AuthPlug do
  use ServerChatWeb, :controller
  
  alias ServerChat. { Utils.ApiHandler }
  
  def init(_) do end

  def call(conn, _) do
    token = conn.query_params["token"]
    cond do
      token != nil -> 
        jwt_key_secret = Application.get_env(:server_chat, ServerChatWeb.Endpoint)[:secret_key_base]
        # phải có from_oct để key không bị đổi thành bytes
        jwk = JOSE.JWK.from_oct(jwt_key_secret)
        data_token = JOSE.JWT.verify(jwk, token)
        
        case data_token do
          {true, payload, _} ->
            user = Map.put(%{}, :user_id, payload.fields["account_id"])
            assign(conn, :user, user)

          _ -> ApiHandler.send_conn_error(conn, "invalid token", 200, 401)
        end

      true -> ApiHandler.send_conn_error(conn, "lack of token aaaa", 200, 402)
    end
  end
  
  # def validate_token(conn, token) do
  #   try do
  #     jwt_key_secret = Application.get_env(:server_chat, ServerChatWeb.Endpoint)[:secret_key_base]
  #     # phải có from_oct để key không bị đổi thành bytes
  #     jwk = JOSE.JWK.from_oct(jwt_key_secret)
      
  #     {a,b, c} = JOSE.JWT.verify(jwk, token) 
      
  #     # case JOSE.JWT.verify(jwk, token) do
  #     #   {true, jwt_fields, jws} ->
  #     #     # user  = jwt_fields.fields["account_id"]
  #     #     # assign(conn, :current_user, user)
  #     #     conn
  #     #     # else
  #     #     #   ApiHandler.send_conn_error(conn, "invalid user")
  #     #     # end
  #     #   _ -> ApiHandler.send_conn_error(conn, "invalid token")
  #     # end
  #   rescue
  #     RuntimeError -> ApiHandler.send_conn_error(conn, "invalid token")
  #   end
  # end
end
