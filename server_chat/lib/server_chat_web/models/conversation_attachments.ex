defmodule ServerChat.ConversationAttachments do
  use Ecto.Schema
  import Ecto.Changeset
  alias ServerChat .{ Conversations, Messages }

  schema "conversation_attachments" do
    field :type,                :integer
    field :content_url,         :string
    field :file_name,            :string
    field :size,                :integer
    field :thumbnail_url,       :string

    belongs_to :conversations, Conversations, type: Ecto.UUID, foreign_key: :conversation_id
    belongs_to :messages, Messages, type: Ecto.UUID, foreign_key: :message_id
    timestamps()
  end

  def changeset(conversation_attachments, attrs) do
    conversation_attachments
    |> cast(attrs, [:type, :content_url, :file_name, :size, :thumbnail_url])
    # |> validate_required([:sender_id, :attachments, :reactions])
  end
end
