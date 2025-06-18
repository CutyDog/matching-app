# == Schema Information
#
# Table name: matches
#
#  id         :bigint           not null, primary key
#  matched_at :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_1_id  :bigint           not null
#  user_2_id  :bigint           not null
#
# Indexes
#
#  index_matches_on_user_1_id_and_user_2_id  (user_1_id,user_2_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_1_id => users.id)
#  fk_rails_...  (user_2_id => users.id)
#
class Match < ApplicationRecord
  belongs_to :user_1, class_name: 'User', foreign_key: :user_1_id
  belongs_to :user_2, class_name: 'User', foreign_key: :user_2_id

  validates :user_1_id, uniqueness: { scope: :user_2_id }
  validates :matched_at, presence: true
end
