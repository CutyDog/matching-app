module Subscriptions
  module Chats
    class NewMessage < Base
      field :chat_message, ObjectTypes::ChatMessageType, null: false

      argument :chat_room_id, ID, required: true

      def update(**_args)
        { chat_message: object }
      end
    end
  end
end