defmodule FmecgElixir.Repo do
  use Ecto.Repo,
    otp_app: :fmecg_elixir,
    adapter: Ecto.Adapters.Postgres
end
