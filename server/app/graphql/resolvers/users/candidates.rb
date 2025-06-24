module Resolvers
  module Users
    class Candidates < SignInRequiredResolver
      type ObjectTypes::UserType.connection_type, null: false

      def resolve
        current_user.candidates
      end
    end
  end
end