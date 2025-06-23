module RequestSpecSupport
  def post_graphql(query, variables: {}, headers: {})
    post '/graphql', params: { query:, variables: }, headers:, as: :json
  end

  def perform_subscription(query, variables: {})
    perform :execute, query:, variables:
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

  def transmission_data
    transmissions.last.dig('result', 'data')
  end

  def transmission_errors
    transmissions.last.dig('result', 'errors')
  end
end