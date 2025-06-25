module Mutations
  module Chats
    class StartChat < SignInRequiredMutation
      field :chat_room, ObjectTypes::ChatRoomType, null: true

      argument :member_id, ID, required: true

      def resolve(member_id:)
        user = User.find(member_id)
        raise GraphQL::ExecutionError, 'マッチ成立してないため、トークを開始できません' unless current_user.matched_users.include?(user)

        chat_room = ChatRoom.start_with_members([current_user, user])

        { chat_room: }
      end
    end
  end
end