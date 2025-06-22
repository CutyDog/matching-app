module Mutations
  module Chats
    class SendMessage < BaseMutation
      argument :chat_room_id, ID, required: true
      argument :content, String, required: true

      field :chat_message, ::ObjectTypes::ChatMessageType, null: true

      def resolve(chat_room_id:, content:)
        chat_room = ::ChatRoom.find(chat_room_id)

        unless chat_room.users.include?(context[:current_user])
          raise GraphQL::ExecutionError, "You are not a participant of this chat room."
        end

        chat_message = chat_room.chat_messages.build(user: context[:current_user], content: content)

        if chat_message.save
          ServerSchema.subscriptions.trigger(:chat_message_was_posted, { chat_room_id: chat_room.id }, chat_message)
          { chat_message: chat_message }
        else
          { errors: chat_message.errors.full_messages }
        end
      end
    end
  end
end