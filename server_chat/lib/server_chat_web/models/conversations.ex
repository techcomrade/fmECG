defmodule ServerChat.Conversations do
  use Ecto.Schema
  import Ecto.Changeset
  alias ServerChat .{ Messages, ConversationAttachments, ConversationMembers }
  
  @primary_key {:id, :string, autogenerate: false}
  schema "conversations" do
    field :name,          :string
    field :avatar_url,    :string
    field :type,          :integer

    has_many :messages, Messages, foreign_key: :conversation_id
    has_many :conversation_attachments, ConversationAttachments, foreign_key: :conversation_id
    has_many :conversation_members, ConversationMembers, foreign_key: :conversation_id
    timestamps()
  end

  def changeset(conversations, params \\ %{}) do
    conversations
    |> cast(params, [:name, :avatar_url, :integer])
    # |> validate_required([:nme, :avatar_url])
  end
end
