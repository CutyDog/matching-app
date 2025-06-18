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
require 'rails_helper'

RSpec.describe Like, type: :model do
  let(:sender) { create(:user) }
  let(:receiver) { create(:user) }

  describe 'validations' do
    subject { build(:like, sender:, receiver:) }

    it { is_expected.to belong_to(:sender) }
    it { is_expected.to belong_to(:receiver) }
    it { is_expected.to validate_uniqueness_of(:sender_id).scoped_to(:receiver_id) }
    it { is_expected.to define_enum_for(:status).with_values(pending: 0, accepted: 1, rejected: 2) }
  end

  describe 'custom validations' do
    context 'when sender and receiver are the same user' do
      let(:like) { build(:like, sender:, receiver: sender) }

      it 'is invalid' do
        expect(like).not_to be_valid
        expect(like.errors[:receiver_id]).to include '自分自身にいいねはできません'
      end
    end

    context 'when a like already exists in reverse order' do
      let(:like) { build(:like, sender:, receiver:) }

      before { create(:like, sender: receiver, receiver: sender) }

      it 'is invalid' do
        expect(like).not_to be_valid
        expect(like.errors[:receiver_id]).to include 'このユーザーから既にいいねされてるため、こちらからいいねできません'
      end
    end
  end
end
