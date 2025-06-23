module Resolvers
  module Chats
    class ChatRoom < SignInRequiredResolver
      type ObjectTypes::ChatRoomType, null: true

      argument :id, ID, required: true

      def resolve(**_args)
        chat_room
      end

      def authorized?(**_args)
        super

        return true if current_user.participant?(chat_room)

        raise GraphQL::ExecutionError, 'You are not a participant of this chat room.'
      end

      private

      def chat_room
        @chat_room ||= ::ChatRoom.find(arguments[:id])
      end
    end
  end
end