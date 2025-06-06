# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  last_login_at   :datetime
#  name            :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#  index_users_on_name   (name) UNIQUE
#
class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  class UnauthorizedError < StandardError; end

  def self.find_by_jwt!(jwt_token)
    secret_key = Rails.application.credentials.secret_key_base
    payload = JWT.decode(jwt_token, secret_key)[0]
    User.find(payload['user_id'])
  rescue JWT::ExpiredSignature
    raise UnauthorizedError, 'JWT token expired'
  rescue JWT::DecodeError
    raise UnauthorizedError, 'Invalid JWT token'
  rescue ActiveRecord::RecordNotFound
    raise UnauthorizedError, 'User not found'
  end

  def issue_jwt_token
    payload = { user_id: id, exp: 6.hours.from_now.to_i }
    secret_key = Rails.application.credentials.secret_key_base
    JWT.encode(payload, secret_key)
  end
end
