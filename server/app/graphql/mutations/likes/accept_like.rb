module Mutations
  module Likes
    class AcceptLike < SignInRequiredMutation
      field :like, ObjectTypes::LikeType, null: true

      argument :like_id, ID, required: true

      def resolve(like_id:)
        like = current_user.passive_likes.find(like_id)
        like.accept!

        { like: }
      end
    end
  end
end