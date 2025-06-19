module Mutations
  module Auth
    class SignIn < BaseMutation
      field :token, String, null: true

      argument :email, String, required: true
      argument :password, String, required: true

      def resolve(email:, password:)
        user = User.find_by(email:)
        raise GraphQL::ExecutionError, 'User not found by email' unless user

        user.sign_in!(password)

        { token: user.issue_jwt_token }
      rescue User::UnauthorizedError => e
        raise GraphQL::ExecutionError, e.message
      end
    end
  end
end