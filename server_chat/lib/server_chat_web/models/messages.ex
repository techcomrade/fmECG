defmodule ServerChat.Messages do
  use Ecto.Schema
  import Ecto.Changeset
  alias ServerChat .{ Conversations }
  
  @primary_key {:id, Ecto.UUID, autogenerate: true}
  schema "messages" do
    field :sender_id,       :string
    field :attachments,     {:array, :map}, default: []
    field :system_message,  :boolean
    field :pin,             :boolean
    field :pin_time,        :naive_datetime
    field :reactions,       {:array, :map}, default: []

    belongs_to :conversations, Conversations, type: Ecto.UUID
    has_many :conversation_attachments, ConversationAttachments, foreign_key: :id
    timestamps()
  end

  def changeset(messages, attrs) do
    messages
    |> cast(attrs, [:sender_id, :attachments, :system_message, :pin, :pin_time, :reactions])
    |> validate_required([:sender_id, :attachments, :reactions])
  end
end
