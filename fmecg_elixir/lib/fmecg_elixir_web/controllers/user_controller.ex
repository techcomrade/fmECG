defmodule FmecgElixirWeb.UserController do
  use FmecgElixirWeb, :controller
  alias FmecgElixir.{ User, Repo }

  def me(conn, params) do
    IO.inspect(conn, label: "dksfknsdl")
    IO.inspect(params, label: "2")
  end

  def create(conn, params) do
    # config claim jwt
    expiration_claim = %Joken.Claim{
      generate: fn -> Joken.current_time() + (24 * 90 * 60 * 60) end,
      validate: fn val, _claims, _context -> val < Joken.current_time() end
    }

    %{}
    |> Map.put("exp", expiration_claim)
    |> Joken.generate_claims()
    |> case do
      # pass key to here
      {:ok, claims} -> Joken.encode_and_sign(claims, Joken.Signer.create("HS256", "my secret"))
      |> case do
        {:ok, token, _claims} -> insert_user_to_database(params, token, conn)
        _ -> json conn, %{success: false, message: "Error when generate token", error_code: 001}
      end
      _ -> json conn, %{success: false, message: "Error when generate claims", error_code: 002}
    end
  end

  defp insert_user_to_database(user, token, conn) do
    user_id = String.downcase(Ecto.UUID.generate())
    name = user["name"]
    email = user["email"]
    password = user["password"]
    role_id = user["role"] || 2

    %User{
      user_id: user_id,
      name: name,
      email: email,
      password: password,
      role: role_id,
      token: token
    }
    |> Repo.insert
    |> case do
      {:ok, _} -> json conn, %{success: true, message: "Register succesfully"}
      _ -> json conn, %{success: false, message: "Register failed"}
    end
  end

  def login() do

  end

  def update() do

  end

  def recover_password() do

  end

  def delete() do

  end

  def logout() do

  end

end

# error code
# 001
# 002
# 003
