defmodule ServerChat.Conversations do
  use Ecto.Schema
  import Ecto.Changeset
  alias ServerChat .{ Messages }
  
  @primary_key {:id, Ecto.UUID, autogenerate: true}
  schema "conversations" do
    field :user_ids,      {:array, :integer}, default: []

    has_many :messages, Messages, foreign_key: :id
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
  def changeset(conversations, params \\ %{}) do
    conversations
    |> cast(params, [:user_ids])
    |> validate_required([:user_ids])
  end
end
