# frozen_string_literal: true

module ObjectTypes
  class ChatMessageType < ::Types::BaseObject
    field :id, ID, null: false
    field :chat_room_id, Integer, null: false
    field :user_id, Integer, null: false
    field :content, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :chat_room, ObjectTypes::ChatRoomType, null: false
    field :user, ObjectTypes::UserType, null: false

    def chat_room
      Loaders::AssociationLoader.for(ChatMessage, :chat_room).load(object)
    end

    def user
      Loaders::AssociationLoader.for(ChatMessage, :user).load(object)
    end
  end
end
