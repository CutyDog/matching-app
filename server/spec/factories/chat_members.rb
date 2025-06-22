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
FactoryBot.define do
  factory :chat_member do
    chat_room
    user
  end
end
