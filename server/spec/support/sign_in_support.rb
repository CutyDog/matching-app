require 'ostruct'

module SignInSupport
  def signed_in_header(user)
    { 'Token' => user.issue_jwt_token }
  end

  def signed_in_connection(user)
    stub_connection(current_user: user)
  end
end