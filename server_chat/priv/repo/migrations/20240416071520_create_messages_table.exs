defmodule ServerChat.Repo.Migrations.CreateMessagesTable do
  use Ecto.Migration

  def change do
    create table(:messages, primary_key: false) do
      add :id,                    :uuid, primary_key: true
      add :conversation_id,       references(:conversations, on_delete: :nilify_all, column: :id, type: :uuid), null: false
      add :sender_id,             :string, null: false
      add :message_content,       :string
      add :attachments,           :map
      timestamps()
    end
  end
end
