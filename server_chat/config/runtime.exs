import Config

# config/runtime.exs is executed for all environments, including
# during releases. It is executed after compilation and before the
# system starts, so it is typically used to load production configuration
# and secrets from environment variables or elsewhere. Do not define
# any compile-time configuration in here, as it won't be applied.
# The block below contains prod specific runtime configuration.

# ## Using releases
#
# If you use `mix release`, you need to explicitly enable the server
# by passing the PHX_SERVER=true when you start it:
#
#     PHX_SERVER=true bin/server_chat start
#
# Alternatively, you can use `mix phx.gen.release` to generate a `bin/server`
# script that automatically sets the env var above.
if System.get_env("PHX_SERVER") do
  config :server_chat, ServerChatWeb.Endpoint, server: true
end

if config_env() == :prod do
  host = System.get_env("PHX_HOST") || "127.0.0.1"
  port = System.get_env("PHX_PORT") || 4000
  secret_key_base = System.get_env("SECRET_KEY_BASE")
  github_token = System.get_env("GITHUB_TOKEN")

  config :server_chat, ServerChatWeb.Endpoint,
    http: [port: port],
    url: [host: host],
    server: true,
    check_origin: ["//#{host}"],
    secret_key_base: secret_key_base,
    github_token: github_token
  
  # Configure your database
  config :server_chat, ServerChat.Repo,
    adapter: Ecto.Adapters.Postgres,
    username: System.get_env("POSTGRES_USER") || "admin",
    password: System.get_env("POSTGRES_PASSWORD") || "",
    database: System.get_env("DB_NAME") || "server_chat_fmecg",
    hostname: System.get_env("DB_HOSTNAME") || "localhost",
    pool_size: 20,
    port: "5432"

  # ## SSL Support
  #
  # To get SSL working, you will need to add the `https` key
  # to your endpoint configuration:
  #
  #     config :server_chat, ServerChatWeb.Endpoint,
  #       https: [
  #         ...,
  #         port: 443,
  #         cipher_suite: :strong,
  #         keyfile: System.get_env("SOME_APP_SSL_KEY_PATH"),
  #         certfile: System.get_env("SOME_APP_SSL_CERT_PATH")
  #       ]
  #
  # The `cipher_suite` is set to `:strong` to support only the
  # latest and more secure SSL ciphers. This means old browsers
  # and clients may not be supported. You can set it to
  # `:compatible` for wider support.
  #
  # `:keyfile` and `:certfile` expect an absolute path to the key
  # and cert in disk or a relative path inside priv, for example
  # "priv/ssl/server.key". For all supported SSL configuration
  # options, see https://hexdocs.pm/plug/Plug.SSL.html#configure/1
  #
  # We also recommend setting `force_ssl` in your endpoint, ensuring
  # no data is ever sent via http, always redirecting to https:
  #
  #     config :server_chat, ServerChatWeb.Endpoint,
  #       force_ssl: [hsts: true]
  #
  # Check `Plug.SSL` for all available options in `force_ssl`.
end
