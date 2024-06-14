defmodule ServerChat.Repo.Migrations.DropAllTablesBefore do
  use Ecto.Migration

  def change do
    drop table(:messages)
    drop table(:conversations)
  end
end
