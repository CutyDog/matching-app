# frozen_string_literal: true

module ObjectTypes
  class ChatRoomType < ::Types::BaseObject
    field :id, ID, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :users, [ObjectTypes::UserType], null: false
    field :chat_messages, [ObjectTypes::ChatMessageType], null: false
    field :latest_message, ObjectTypes::ChatMessageType, null: true

    def users
      Loaders::AssociationLoader.for(ChatRoom, :users).load(object)
    end

    def chat_messages
      Loaders::AssociationLoader.for(ChatRoom, :chat_messages, scope: ChatMessage.order(created_at: :asc)).load(object)
    end

    def latest_message
      Loaders::AssociationLoader.for(ChatRoom, :latest_message).load(object)
    end
  end
end
