module Mutations
  module Auth
    class SignUp < BaseMutation
      field :user, ObjectTypes::UserType, null: true
      field :token, String, null: true

      argument :name, String, required: true
      argument :email, String, required: true
      argument :password, String, required: true

      def resolve(name:, email:, password:)
        user = User.sign_up!(name:, email:, password:)

        write_current_user(user)

        { user:, token: user.issue_jwt_token }
      end

      private

      def write_current_user(user)
        # UserType 内で current_user を取得するために、context に保存する
        context[:current_user] = user
      end
    end
  end
end