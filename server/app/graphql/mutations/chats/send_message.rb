module Mutations
  module Chats
    class SendMessage < Base
      field :chat_message, ObjectTypes::ChatMessageType, null: true

      argument :chat_room_id, ID, required: true
      argument :content, String, required: true

      def resolve(**_args)
        chat_message = chat_room.chat_messages.create!(user: current_user, content: arguments[:content])

        ServerSchema.subscriptions.trigger(:new_message, { chat_room_id: chat_room.id }, chat_message)

        { chat_message: }
      end
    end
  end
end