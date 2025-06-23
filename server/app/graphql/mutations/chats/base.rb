module Mutations
  module Chats
    class Base < SignInRequiredMutation
      def authorized?(**args)
        super

        return true if current_user.participant?(chat_room)

        raise GraphQL::ExecutionError, 'You are not a participant of this chat room.'
      end

      private

      def chat_room
        @chat_room ||= ChatRoom.find(arguments[:chat_room_id])
      end
    end
  end
end