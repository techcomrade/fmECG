defmodule ServerChat.Repo.Migrations.ChangeTypeUserIdsConversation do
  use Ecto.Migration

  def change do
    alter table(:conversations) do
      remove :user_ids
      add :user_ids, {:array, :uuid}, default: []
    end
  end
end
