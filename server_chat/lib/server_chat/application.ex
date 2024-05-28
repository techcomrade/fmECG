defmodule ServerChat.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      ServerChatWeb.Telemetry,
      # Start the Ecto repository
      ServerChat.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: ServerChat.PubSub},
      # Start the Endpoint (http/https)
      ServerChatWeb.Endpoint,
      ServerChat.Scheduler,
      ServerChat.GithubStore,
      ServerChat.Fcm.FcmStore
      # Start a worker by calling: ServerChat.Worker.start_link(arg)
      # {ServerChat.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ServerChat.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ServerChatWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
