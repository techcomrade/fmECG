defmodule ServerChat.Repo.Migrations.CreateUniqueIndexConversationMembers do
  use Ecto.Migration

  def change do
		create unique_index(:conversation_members, [:conversation_id, :user_id], name: :conversation_members_unique_index)
  end
end
