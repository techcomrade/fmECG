defmodule FmecgElixirWeb.UserController do
  use FmecgElixirWeb, :controller
  alias FmecgElixir.{ User, Repo }


  def me(conn, params) do
    IO.inspect(conn, label: "dksfknsdl")
    IO.inspect(params, label: "2")
  end

  def create(conn, params) do
    user_id = Ecto.UUID.generate()
    name = params["name"]
    email = params["email"]
    password = params["password"]
    role_id = params["role"] || 2

    %User{
      user_id: user_id,
      name: name,
      email: email,
      password: password,
      role: role_id
    }
    |> Repo.insert
    |> case do
      {:ok, _} -> json conn, %{success: true, message: "Register succesfully"}
      _ -> json conn, %{success: true, message: "Register failed"}
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
