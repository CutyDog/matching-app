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
require 'rails_helper'

RSpec.describe Match, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
