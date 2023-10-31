defmodule FmecgElixir.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :user_id, Ecto.UUID
    field :name, :string
    field :password, :string
    field :role, :integer
    field :email, :string
    field :date_of_birth, :naive_datetime
    field :phone_number, :string
    field :token, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:user_id, :name, :email, :password, :role])
    |> validate_required([:user_id, :name, :email, :password, :role])
  end
end
