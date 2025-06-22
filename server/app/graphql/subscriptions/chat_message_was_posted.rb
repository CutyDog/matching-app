module Subscriptions
  class ChatMessageWasPosted < SignInRequiredSubscription
    argument :chat_room_id, ID, required: true

    payload_type ::ObjectTypes::ChatMessageType

    def subscribe(chat_room_id:)
      chat_room = ::ChatRoom.find(chat_room_id)
      unless chat_room.users.include?(context[:current_user])
        raise GraphQL::ExecutionError, "You are not authorized to subscribe to this chat room."
      end
      :no_response
    end

    def update(chat_room_id:)
      object
    end
  end
end