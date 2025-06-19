module Mutations
  module Likes
    class SendLike < SignInRequiredMutation
      field :like, ObjectTypes::LikeType, null: true

      argument :receiver_id, ID, required: true

      def resolve(receiver_id:)
        receiver = User.find(receiver_id)
        like = current_user.active_likes.create!(receiver:)

        { like: }
      end
    end
  end
end