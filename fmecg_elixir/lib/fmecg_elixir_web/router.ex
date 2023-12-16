defmodule FmecgElixirWeb.Router do
  use FmecgElixirWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {FmecgElixirWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # scope "/", FmecgElixirWeb do
  #   pipe_through :browser

  #   get "/", PageController, :home
  # end

  # Other scopes may use custom stacks.
  scope "/api", FmecgElixirWeb do
    pipe_through :api

    scope "/users" do
      get "/me",                              UserController,               :me
      post "/update",                         UserController,               :update
      post "/register",                       UserController,               :create
      post "/login",                          UserController,               :login
      # post "/login_password",                 UserController,               :password_login
      post "/recover_password",               UserController,               :password_recovery
      # post "/check_phone_number",             UserController,               :check_phone_number
      # post "/check_existed_account",          UserController,               :check_existed_account
      # post "/forgot_password",                UserController,               :forgot_password
      # post "/reset_password",                 UserController,               :reset_password
      # post "/change_password",                UserController,               :change_password
      post "/delete",                    UserController,                    :delete
      # post "/change_birthday",                UserController,               :change_birthday
      post "/logout",                         UserController,               :logout
      # post "/create_otp",                     UserController,               :create_otp
      # post "/verify_otp",                     UserController,               :verify_otp
    end
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:fmecg_elixir, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: FmecgElixirWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
