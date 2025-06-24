# == Schema Information
#
# Table name: chat_rooms
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ChatRoom < ApplicationRecord
  has_many :chat_members, dependent: :destroy
  has_many :users, through: :chat_members
  has_many :chat_messages, dependent: :destroy

  has_one :latest_message, -> { order(created_at: :desc) }, class_name: 'ChatMessage', dependent: :destroy, inverse_of: :chat_room
end
