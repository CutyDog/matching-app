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

  class << self
    def start_with_members(members)
      # すでにチャットルームが存在するか確認
      existing_room = find_existing_room(members)
      return existing_room if existing_room

      ActiveRecord::Base.transaction do
        room = create!
        members.each { |member| room.chat_members.create!(user: member) }
        room
      end
    end

    private

    def find_existing_room(members)
      chat_members = ChatMember.where(user_id: members.map(&:id))
      joins(:chat_members).merge(chat_members).find do |room|
        room.users.pluck(:id).sort == members.map(&:id).sort
      end
    end
  end
end
