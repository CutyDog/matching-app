# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :sign_in, mutation: Mutations::Auth::SignIn
    field :sign_up, mutation: Mutations::Auth::SignUp
  end
end
