defmodule FmecgElixir.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      FmecgElixirWeb.Telemetry,
      # Start the Ecto repository
      FmecgElixir.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: FmecgElixir.PubSub},
      # Start Finch
      {Finch, name: FmecgElixir.Finch},
      # Start the Endpoint (http/https)
      FmecgElixirWeb.Endpoint
      # Start a worker by calling: FmecgElixir.Worker.start_link(arg)
      # {FmecgElixir.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: FmecgElixir.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    FmecgElixirWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
