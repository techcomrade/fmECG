import Config

# Do not print debug messages in production
config :logger, level: :info

config :server_chat, ServerChatWeb.Endpoint,
  http: [port: 4000],
  url: [host: "171.244.8.114"],
  # cache_static_manifest: "priv/static/cache_manifest.json"
  server: true,
  check_origin: ["//171.244.8.114"],
  secret_key_base: "1234"

# Runtime production configuration, including reading
# of environment variables, is done on config/runtime.exs.
