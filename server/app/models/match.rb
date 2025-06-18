# == Schema Information
#
# Table name: matches
#
#  id         :bigint           not null, primary key
#  matched_at :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user1_id   :bigint           not null
#  user2_id   :bigint           not null
#
# Indexes
#
#  index_matches_on_user1_id_and_user2_id  (user1_id,user2_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user1_id => users.id)
#  fk_rails_...  (user2_id => users.id)
#
class Match < ApplicationRecord
  belongs_to :user1, class_name: 'User', inverse_of: :matches_as_user1
  belongs_to :user2, class_name: 'User', inverse_of: :matches_as_user2

  validates :user1_id, uniqueness: { scope: :user2_id }
  validates :matched_at, presence: true
end
