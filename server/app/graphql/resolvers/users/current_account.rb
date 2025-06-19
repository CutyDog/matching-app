module Resolvers
  module Users
    class CurrentAccount < SignInRequiredResolver
      type ObjectTypes::UserType, null: true

      def resolve
        current_user
      end
    end
  end
end