# == Schema Information
#
# Table name: chat_messages
#
#  id           :bigint           not null, primary key
#  content      :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  chat_room_id :bigint           not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_chat_messages_on_chat_room_id  (chat_room_id)
#  index_chat_messages_on_user_id       (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (chat_room_id => chat_rooms.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe ChatMessage, type: :model do
  describe 'validations' do
    subject { build(:chat_message) }

    it { is_expected.to validate_presence_of(:content) }
  end

  describe 'associations' do
    let(:chat_message) { create(:chat_message) }

    it { is_expected.to belong_to(:chat_room) }
    it { is_expected.to belong_to(:user) }
  end
end
