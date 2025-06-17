class ApplicationController < ActionController::API
  private

  def jwt_token
    request.headers['Token']&.split(' ')&.last
  end
end
