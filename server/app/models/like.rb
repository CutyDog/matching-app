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
class Like < ApplicationRecord
  belongs_to :sender, class_name: 'User', dependent: :destroy
  belongs_to :receiver, class_name: 'User', dependent: :destroy

  validates :sender_id, uniqueness: { scope: :receiver_id }
  validate :different_users
  validate :unique_combination
  validates :accepted_at, presence: true, if: -> { status == 'accepted' }

  enum :status, { pending: 0, accepted: 1, rejected: 2 }

  private

  def different_users
    errors.add(:receiver_id, '自分自身にいいねはできません') if sender_id == receiver_id
  end

  def unique_combination
    return unless Like.where(sender_id: receiver_id, receiver_id: sender_id).count.positive?

    # 逆向きのいいねが存在する場合はエラー
    errors.add(:receiver_id, 'このユーザーから既にいいねされてるため、こちらからいいねできません')
  end
end
