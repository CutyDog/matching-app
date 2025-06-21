# == Schema Information
#
# Table name: profiles
#
#  id           :bigint           not null, primary key
#  avatar_url   :string
#  birthday     :date             not null
#  gender       :integer          default("male"), not null
#  introduction :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_profiles_on_gender   (gender)
#  index_profiles_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Profile < ApplicationRecord
  belongs_to :user

  validates :birthday, presence: true

  enum :gender, { male: 0, female: 1, other: 2 }
end
