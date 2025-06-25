module Resolvers
  module Users
    class Candidates < SignInRequiredResolver
      type ObjectTypes::UserType.connection_type, null: false

      argument :active_likes, Boolean, required: false, default_value: false
      argument :passive_likes, Boolean, required: false, default_value: false
      argument :matched_likes, Boolean, required: false, default_value: false

      def resolve(active_likes: false, passive_likes: false, matched_likes: false)
        if active_likes
          current_user.active_liked_users
        elsif passive_likes
          current_user.passive_liked_users
        elsif matched_likes
          current_user.matched_users
        else
          current_user.candidates
        end
      end
    end
  end
end