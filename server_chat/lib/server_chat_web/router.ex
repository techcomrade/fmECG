defmodule ServerChatWeb.Router do
  use ServerChatWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", ServerChatWeb do
    pipe_through :api
  end
end
