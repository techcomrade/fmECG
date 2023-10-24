defmodule FmecgElixir.Repo.Migrations.CreateRecords do
  use Ecto.Migration

  def change do
    create table(:records) do
      add :user_id, :uuid
      add :device_id, :uuid
      add :data_directory, :string
      add :start_time, :naive_datetime
      add :stop_time, :naive_datetime

      timestamps()
    end
  end
end
