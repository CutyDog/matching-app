class ApplicationController < ActionController::API
  private

  def current_user
    @current_user ||= User.find_by_jwt!(jwt_token) # rubocop:disable Rails/DynamicFindBy
  rescue User::UnauthorizedError
    nil
  end

  def jwt_token
    request.headers['Token']&.split(' ')&.last
  end
end