defmodule FmecgElixir.Repo.Migrations.CreateAssignments do
  use Ecto.Migration

  def change do
    create table(:assignments) do
      add :doctor_id, :uuid
      add :patient_id, :uuid

      timestamps()
    end
  end
end
