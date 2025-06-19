module Mutations
  module Likes
    class RejectLike < SignInRequiredMutation
      field :like, ObjectTypes::LikeType, null: true

      argument :like_id, ID, required: true

      def resolve(like_id:)
        like = current_user.passive_likes.find(like_id)
        like.rejected!

        { like: }
      end
    end
  end
end