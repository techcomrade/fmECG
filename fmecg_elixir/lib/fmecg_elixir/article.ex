defmodule FmecgElixir.Article do
  use Ecto.Schema
  import Ecto.Changeset

  schema "articles" do
    field :title, :string
    field :category_id, :integer
    field :content, :string
    field :author_id, Ecto.UUID

    timestamps()
  end

  @doc false
  def changeset(article, attrs) do
    article
    |> cast(attrs, [:category_id, :title, :content, :author_id])
    |> validate_required([:category_id, :title, :content, :author_id])
  end
end
