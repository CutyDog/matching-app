module Resolvers
  module Users
    class Candidates < SignInRequiredResolver
      type ObjectTypes::UserType.connection_type, null: false

      argument :passive_likes, Boolean, required: false, default_value: false

      def resolve(passive_likes: false)
        passive_likes ? current_user.passive_liked_users : current_user.candidates
      end
    end
  end
end