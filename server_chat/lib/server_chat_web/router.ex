defmodule ServerChatWeb.Router do
  use ServerChatWeb, :router
  
  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :put_root_layout, html: {ServerChatWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug ServerChatWeb.AuthPlug
  end
  
  scope "/chat", ServerChatWeb do
    scope "/api" do
      pipe_through :api
      
      scope "/conversations" do
        get "/", ConversationsController, :get_conversation_by_id
        post "/", ConversationsController, :post_conversations
        
        scope "/:conversation_id" do
          get "/", ConversationsController, :get_conversation_by_id
          
          scope "/messages" do
            get "/", MessagesController, :get_all_messages
            
          end
        end
      end
    end
    
    scope "/github" do
      post "/handle_event", GithubController, :handle_event
    end
  end
  
  scope "/", ServerChatWeb do
    pipe_through :browser
  end
end
