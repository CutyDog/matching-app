# == Schema Information
#
# Table name: likes
#
#  id          :bigint           not null, primary key
#  accepted_at :datetime
#  status      :integer          default("pending"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  receiver_id :bigint           not null
#  sender_id   :bigint           not null
#
# Indexes
#
#  index_likes_on_sender_id_and_receiver_id  (sender_id,receiver_id) UNIQUE
#  index_likes_on_status                     (status)
#
# Foreign Keys
#
#  fk_rails_...  (receiver_id => users.id)
#  fk_rails_...  (sender_id => users.id)
#
FactoryBot.define do
  factory :like do
    association :sender, factory: :user
    association :receiver, factory: :user
    accepted_at { Time.current }
  end
end
