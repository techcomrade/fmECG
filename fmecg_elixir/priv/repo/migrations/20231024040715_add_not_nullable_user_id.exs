defmodule FmecgElixir.Repo.Migrations.AddNotNullableUserId do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify :user_id, :uuid, null: false
    end
  end
end
