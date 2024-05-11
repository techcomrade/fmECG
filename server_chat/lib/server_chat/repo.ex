defmodule ServerChat.Repo do
  use Ecto.Repo,
    otp_app: :server_chat,
    adapter: Ecto.Adapters.Postgres
end
