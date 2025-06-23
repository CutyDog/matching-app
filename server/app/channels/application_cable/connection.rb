module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def current_user
      @current_user ||= User.find_by_jwt!(jwt_token) # rubocop:disable Rails/DynamicFindBy
    rescue User::UnauthorizedError
      nil
    end

    def jwt_token
      request.params[:Token]&.split(' ')&.last
    end
  end
end
