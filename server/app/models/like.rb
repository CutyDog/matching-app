# == Schema Information
#
# Table name: likes
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  receiver_id :bigint           not null
#  sender_id   :bigint           not null
#
# Indexes
#
#  index_likes_on_sender_id_and_receiver_id  (sender_id,receiver_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (receiver_id => users.id)
#  fk_rails_...  (sender_id => users.id)
#
class Like < ApplicationRecord
  belongs_to :sender, class_name: 'User', inverse_of: :sent_likes
  belongs_to :receiver, class_name: 'User', inverse_of: :received_likes

  validates :sender_id, uniqueness: { scope: :receiver_id }
end
