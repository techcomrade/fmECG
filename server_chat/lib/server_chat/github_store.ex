defmodule ServerChat.GithubStore do
  use GenServer
  
  @default_repo_url "https://github.com/techcomrade/fmECG"

  def start_link(_) do
    GenServer.start_link(__MODULE__, nil, name: GithubStore)
  end

  # Lưu số lượng pull được tạo trong 1 map: 
  # %{
  #   repo_url: count 
  # }
  def init(_) do
    {:ok, %{}}
  end

  def handle_call(:get_default_pull_count, _, state) do
    pull_count = Map.get(state, @default_repo_url)
    |> case do
      nil -> 0
      count -> count
    end
    {:reply, pull_count, state}
  end
  
  def handle_cast({:update_count_pull, repo_url, pull_url}, state) do
    if (repo_url != nil && pull_url != nil) do
      new_state = Map.update(state, repo_url, 1, &(&1 + 1))
      {:noreply, new_state}
    else
      {:noreply, state}
    end
  end
  
  def handle_cast({:reset_count, repo_url}, state) do
    if (repo_url != nil) do
      new_state = Map.update(state, repo_url, 0, fn _ -> 0 end)
      {:noreply, new_state}
    else
      {:noreply, state}
    end
  end
end
