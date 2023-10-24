defmodule FmecgElixir.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :user_id, :uuid
      add :name, :string
      add :email, :string
      add :password, :string
      add :date_of_birth, :naive_datetime
      add :role, :integer
      add :phone_number, :string

      timestamps()
    end
  end
end
