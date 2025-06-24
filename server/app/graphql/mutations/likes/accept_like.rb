module Mutations
  module Likes
    class AcceptLike < SignInRequiredMutation
      field :like, ObjectTypes::LikeType, null: true

      argument :like_id, ID, required: false
      argument :sender_id, ID, required: false

      def resolve(like_id: nil, sender_id: nil)
        validate_arguments

        like = like_id ? current_user.passive_likes.find(like_id) : current_user.passive_likes.find_by!(sender_id:)
        like.accept!

        { like: }
      end

      private

      def validate_arguments
        has_like_id = arguments.key?(:like_id)
        has_sender_id = arguments.key?(:sender_id)
        raise GraphQL::ExecutionError, 'like_id or sender_id is required' if (has_like_id && has_sender_id) || (!has_like_id && !has_sender_id)
      end
    end
  end
end