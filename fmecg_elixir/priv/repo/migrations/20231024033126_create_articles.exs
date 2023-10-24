defmodule FmecgElixir.Repo.Migrations.CreateArticles do
  use Ecto.Migration

  def change do
    create table(:articles) do
      add :category_id, :integer
      add :title, :string
      add :content, :string
      add :author_id, :uuid

      timestamps()
    end
  end
end
