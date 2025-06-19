module RequestSpecSupport
  def post_graphql(query, variables: {}, headers: {})
    post '/graphql', params: { query:, variables: }, headers:, as: :json
  end

  def response_body
    JSON.parse(response.body)
  end

  def response_errors
    response_body['errors']
  end

  def response_data
    response_body['data']
  end
end