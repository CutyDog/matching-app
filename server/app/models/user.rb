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
end
