module Mutations
  module Users
    class DeactivateAccount < SignInRequiredMutation
      field :user, ObjectTypes::UserType, null: true

      argument :confirm, Boolean, required: true

      def resolve(confirm:)
        raise GraphQL::ExecutionError, 'Please confirm to deactivate your account' unless confirm

        current_user.inactive!

        { user: current_user }
      end
    end
  end
end