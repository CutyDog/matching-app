module SignInSupport
  def signed_in_header(user)
    { 'Token' => user.issue_jwt_token }
  end
end