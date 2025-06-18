module Mutations
  class SignInRequiredMutation < BaseMutation
    def authorized?(**_args)
      raise GraphQL::ExecutionError, 'login required!!' unless current_user

      true
    end
  end
end