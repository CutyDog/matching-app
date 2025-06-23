module Subscriptions
  class SignInRequiredSubscription < BaseSubscription
    private

    def authorized?(**_args)
      raise GraphQL::ExecutionError, 'login required!!' unless current_user

      true
    end
  end
end