# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean          default(FALSE), not null
#  email           :string           not null
#  last_login_at   :datetime
#  name            :string           not null
#  password_digest :string           not null
#  status          :integer          default("active"), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email   (email) UNIQUE
#  index_users_on_name    (name) UNIQUE
#  index_users_on_status  (status)
#
class User < ApplicationRecord
  has_secure_password

  has_one :profile, dependent: :destroy

  has_many :active_likes, -> { accepted.invert_where }, class_name: 'Like', foreign_key: :sender_id, dependent: :destroy, inverse_of: :sender
  has_many :passive_likes, -> { pending }, class_name: 'Like', foreign_key: :receiver_id, dependent: :destroy, inverse_of: :receiver
  has_many :active_liked_users, through: :active_likes, source: :receiver
  has_many :passive_liked_users, through: :passive_likes, source: :sender

  has_many :active_matches, -> { accepted }, class_name: 'Like', foreign_key: :sender_id, dependent: :destroy, inverse_of: :sender
  has_many :passive_matches, -> { accepted }, class_name: 'Like', foreign_key: :receiver_id, dependent: :destroy, inverse_of: :receiver
  has_many :active_matched_users, through: :active_matches, source: :receiver
  has_many :passive_matched_users, through: :passive_matches, source: :sender

  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
  validates :admin, inclusion: { in: [true, false] }

  enum :status, { active: 0, inactive: 1 }

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