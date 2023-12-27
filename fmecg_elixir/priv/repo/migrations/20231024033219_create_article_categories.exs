defmodule FmecgElixir.Repo.Migrations.CreateArticleCategories do
  use Ecto.Migration

  def change do
    create table(:article_categories) do
      add :name, :string
      add :description, :string

      timestamps()
    end
  end
end
