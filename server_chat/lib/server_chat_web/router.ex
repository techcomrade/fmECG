defmodule ServerChatWeb.Router do
  use ServerChatWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug ServerChatWeb.AuthPlug
  end

  scope "/api", ServerChatWeb do
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
end
