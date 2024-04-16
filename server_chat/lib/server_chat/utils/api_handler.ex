defmodule ServerChat.Utils.ApiHandler do
  
  def get(url, headers \\ [], options \\ []) do
    url_get = HTTPoison.get(url, headers, options)
    handle_http_response(url_get)
  end
  
  def post(url, body) do
    post(url, body, [], [])
  end
  
  def post(:json, url, body) do
    post(:json, url, body, [], [])
  end
  
  def post(url, body, headers, options) do
    url_post = HTTPoison.post(url, body, headers, options)
    handle_http_response(url_post)
  end
  
  def post(:json, url, body, headers, options) do
    body_encoded = Jason.encode!(body)
    headers_json = [{"Content-Type", "application/json"}] ++ headers
    url_post = HTTPoison.post(url, body_encoded, headers_json, options)
    handle_http_response(url_post)
  end

  def delete(url, headers \\ [], options \\ []) do
    url_get = HTTPoison.get(url, headers, options)
    handle_http_response(url_get)
  end
  
  def handle_http_response(response) do
    case response do
      {:ok, %HTTPoison.Response{status_code: status_code, body: body}} ->
        is_success = cond do
          status_code >= 200 and status_code < 300 -> true
          true -> false
        end

        response =
          case Jason.decode(body) do
            {:ok, response} -> response
            {:error, _}     -> body
          end

        %{"success" => is_success, "response" => response, "status_code" => status_code}

      {:error, %HTTPoison.Error{reason: reason}} ->
        %{
          "success" => false,
          "message" => reason
        }
    end
  end
end
