defmodule FmECG.Repo do
  use Ecto.Repo,
    otp_app: :server_elixir,
    adapter: Ecto.Adapters.Postgres
end
