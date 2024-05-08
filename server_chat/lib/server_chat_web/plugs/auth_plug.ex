defmodule ServerChatWeb.AuthPlug do
  use ServerChatWeb, :controller
  
  alias ServerChat. { Utils.ApiHandler, Utils.Helper }
  
  def init(_) do end

  def call(conn, _) do
    token = conn.query_params["token"]
    cond do
      token != nil ->         
        case Helper.validate_token(token) do
          {true, payload, _} ->
            user = Map.put(%{}, :user_id, payload.fields["account_id"])
            assign(conn, :user, user)

          _ -> ApiHandler.send_conn_error(conn, "invalid token", 200, 401)
        end

      true -> ApiHandler.send_conn_error(conn, "lack of token", 200, 402)
    end
  end
end
