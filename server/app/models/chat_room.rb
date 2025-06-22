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
end
