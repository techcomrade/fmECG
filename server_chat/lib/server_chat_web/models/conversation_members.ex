defmodule ServerChat.ConversationMembers do
  use Ecto.Schema
  import Ecto.Changeset
  alias ServerChat .{ Conversations }
  
  schema "conversation_members" do
    field :user_id,             Ecto.UUID
    field :status_notification,  :boolean
    field :role,                :integer
    field :seen,                :boolean

    belongs_to :conversations, Conversations, type: Ecto.UUID
    timestamps()
  end

  def changeset(conversation_members, attrs) do
    conversation_members
    |> cast(attrs, [:user_id, :status_notification, :role, :seen])
    |> validate_required([:user_id])
  end
end
