defmodule ServerChat.Repo.Migrations.CreateNewTablesDbChat do
  use Ecto.Migration

  def change do
    create table(:conversations, primary_key: false) do
      add :id,            :uuid, primary_key: true
      add :name,          :string
      add :type,          :int, null: false
      add :avatar_url,    :string
      timestamps()
    end
    
    create table(:messages, primary_key: false) do
      add :id,              :uuid, primary_key: true
      add :conversation_id, references(:conversations, on_delete: :nilify_all, column: :id, type: :uuid), null: false
      add :sender_id,       :string, null: false
      add :attachments,     {:array, :map}, default: []
      add :system_message,  :boolean
      add :pin,             :boolean
      add :pin_time,        :naive_datetime
      add :reactions,       {:array, :map}, default: []
      timestamps()
    end
    
    create table(:conversation_members) do
      add :conversation_id,     references(:conversations, on_delete: :delete_all, column: :id, type: :uuid), null: false
      add :user_id,             :uuid, null: false
      add :status_notification,  :integer, default: 1
      add :role,                :integer, default: 1
      add :seen,                :boolean
      timestamps()
    end
    
    create table(:conversation_attachments) do
      add :message_id,          references(:messages, on_delete: :delete_all, column: :id, type: :uuid), null: false
      add :conversation_id,     references(:conversations, on_delete: :delete_all, column: :id, type: :uuid), null: false
      add :type,                :integer
      add :content_url,         :string
      add :file_name,            :string
      add :size,                :integer
      add :thumbnail_url,       :string
      timestamps()
    end
  end
end
