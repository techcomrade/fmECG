defmodule ServerChat.Repo.Migrations.AddConversationsTable do
  use Ecto.Migration

  def change do
    create table(:conversations, primary_key: false) do
      add :id,            :uuid, primary_key: true
      add :user_ids,      {:array, :integer}, default: []
      timestamps()
    end
  end
end
