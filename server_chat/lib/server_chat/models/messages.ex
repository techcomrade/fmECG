defmodule ServerChat.Messages do
  use Ecto.Schema
  import Ecto.Changeset
  alias ServerChat .{ Conversations }
  
  @primary_key {:id, Ecto.UUID, autogenerate: true}
  schema "messages" do
    field :conversation_id,       Ecto.UUID
    field :sender_id,             :string
    field :message_content,       :string
    field :attachments,           :map

    belongs_to :conversations, Conversations, type: Ecto.UUID
    timestamps()
  end

  @doc false
  # def changeset(messages, attrs) do
  #   messages
  #   |> cast(attrs, [:name, :workspace_id, :user_id, :order])
  #   |> validate_required([:name, :workspace_id, :user_id, :order])
  # end
end
