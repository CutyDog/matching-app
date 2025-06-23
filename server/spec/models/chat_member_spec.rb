# == Schema Information
#
# Table name: chat_members
#
#  id           :bigint           not null, primary key
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  chat_room_id :bigint           not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_chat_members_on_chat_room_id              (chat_room_id)
#  index_chat_members_on_chat_room_id_and_user_id  (chat_room_id,user_id) UNIQUE
#  index_chat_members_on_user_id                   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (chat_room_id => chat_rooms.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe ChatMember, type: :model do
  describe 'validations' do
    subject { build(:chat_member) }

    it { is_expected.to validate_uniqueness_of(:chat_room_id).scoped_to(:user_id) }
  end

  describe 'associations' do
    let(:chat_member) { create(:chat_member) }

    it { is_expected.to belong_to(:chat_room) }
    it { is_expected.to belong_to(:user) }
  end
end
