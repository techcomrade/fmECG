import Config

# Do not print debug messages in production
config :logger, level: :info

config :server_chat, ServerChatWeb.Endpoint,
  http: [port: 4000],
  url: [host: "103.200.20.59"],
  server: true,
  check_origin: ["//103.200.20.59"],
  secret_key_base: "1234"
  
# Configure your database
config :server_chat, ServerChat.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "sparc",
  password: "sparc",
  database: "server_chat_fmecg",
  hostname: "103.200.20.59",
  pool_size: 20,
  port: "5432"

# Runtime production configuration, including reading
# of environment variables, is done on config/runtime.exs.
