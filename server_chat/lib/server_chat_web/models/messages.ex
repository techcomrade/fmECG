defmodule ServerChat.Messages do
  use Ecto.Schema
  import Ecto.Changeset
  alias ServerChat .{ Conversations }
  
  @primary_key {:id, Ecto.UUID, autogenerate: true}
  schema "messages" do
    field :sender_id,             :string
    field :message_content,       :string
    field :attachments,           :map

    belongs_to :conversation, Conversations, type: Ecto.UUID
    timestamps()
  end

  @spec changeset(
          {map(), map()}
          | %{
              :__struct__ => atom() | %{:__changeset__ => map(), optional(any()) => any()},
              optional(atom()) => any()
            },
          :invalid | %{optional(:__struct__) => none(), optional(atom() | binary()) => any()}
        ) :: Ecto.Changeset.t()
  def changeset(messages, attrs) do
    messages
    |> cast(attrs, [:sender_id, :conversation_id])
    |> validate_required([:sender_id, :conversation_id])
  end
end
