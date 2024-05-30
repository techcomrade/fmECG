defmodule ServerChatWeb.GithubController do
  use ServerChatWeb, :controller
  alias ServerChat. { Utils.ApiHandler }
  
  @default_repo_url "https://github.com/techcomrade/fmECG"
  
  def handle_event(conn, params) do
    action = params["action"]
    merged = params["pull_request"]["merged"]
    is_development = params["pull_request"]["base"]["ref"] == "development"
    pull_url = params["pull_request"]["url"]
    repo_url = params["repository"]["html_url"]
    need_handle_pull = action == "closed" && merged && is_development
    
    if (need_handle_pull) do
      update_count_pull(repo_url, pull_url)
      json conn, %{success: true, message: "handled this github event successfully"}
    else
      json conn, %{success: false, message: "not handle this github event"}
    end
  end
  
  def update_count_pull(repo_url, pull_url) do
    GenServer.cast(GithubStore, {:update_count_pull, repo_url, pull_url})
  end
  
  def dispatch_workflow_gha() do
    count = GenServer.call(GithubStore, :get_default_pull_count)
    if (count > 0) do
      url_distpatch = "https://api.github.com/repos/techcomrade/fmecg/actions/workflows/docker.yaml/dispatches"
      body = %{"ref" => "development"}
      github_token = Application.get_env(:server_chat, ServerChatWeb.Endpoint)[:github_token]
      authorization = {"Authorization", "Bearer #{github_token}"}
      headers = [{"X-GitHub-Api-Version", "2022-11-28"}, {"Accept", "application/vnd.github+json"}, authorization]

      response = ApiHandler.post(:json, url_distpatch, body, headers, [])

      is_success = response["success"]
      if (is_success) do
        GenServer.cast(GithubStore, {:reset_count, @default_repo_url})
      end
    end
  end
end
