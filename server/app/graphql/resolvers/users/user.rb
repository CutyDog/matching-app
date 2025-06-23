module Resolvers
  module Users
    class User < SignInRequiredResolver
      type ObjectTypes::UserType, null: true

      argument :id, ID, required: true

      def resolve(id:)
        ::User.find(id)
      end
    end
  end
end