# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :sign_in, mutation: Mutations::Auth::SignIn
    field :sign_up, mutation: Mutations::Auth::SignUp

    field :deactivate_account, mutation: Mutations::Users::DeactivateAccount

    field :create_profile, mutation: Mutations::Profiles::CreateProfile
    field :update_profile, mutation: Mutations::Profiles::UpdateProfile

    field :send_like, mutation: Mutations::Likes::SendLike
    field :accept_like, mutation: Mutations::Likes::AcceptLike
    field :reject_like, mutation: Mutations::Likes::RejectLike
  end
end
