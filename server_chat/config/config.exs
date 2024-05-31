# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :server_chat,
  ecto_repos: [ServerChat.Repo]

# Configures the endpoint
config :server_chat, ServerChatWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [
    formats: [json: ServerChatWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: ServerChat.PubSub,
  live_view: [signing_salt: "9ZOch+bn"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :elixir, :time_zone_database, Tzdata.TimeZoneDatabase
  
config :server_chat, ServerChat.Scheduler,
  timezone: "Asia/Bangkok",
  jobs: [
    [
      name: :scheduled_build_docker_images,
      schedule: "27 0 * * *", # Runs every midnight
      task: {ServerChatWeb.GithubController, :dispatch_workflow_gha, []},
      run_strategy: Quantum.RunStrategy.Local
    ],
  ]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
