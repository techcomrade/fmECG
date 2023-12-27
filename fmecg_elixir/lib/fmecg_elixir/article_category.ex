defmodule FmecgElixir.ArticleCategory do
  use Ecto.Schema
  import Ecto.Changeset

  schema "article_categories" do
    field :name, :string
    field :description, :string

    timestamps()
  end

  @doc false
  def changeset(article_category, attrs) do
    article_category
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
