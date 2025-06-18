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
FactoryBot.define do
  factory :match do
    
  end
end
