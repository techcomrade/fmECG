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

  @doc false
  # def changeset(messages, attrs) do
  #   messages
  #   |> cast(attrs, [:name, :workspace_id, :user_id, :order])
  #   |> validate_required([:name, :workspace_id, :user_id, :order])
  # end
end
