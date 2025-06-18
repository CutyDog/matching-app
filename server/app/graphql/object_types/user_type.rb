# frozen_string_literal: true

module ObjectTypes
  class UserType < ::Types::BaseObject
    field :id, ID, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :name, String, null: false, require_himself: true
    field :email, String, null: false, require_himself: true
    field :password_digest, String, null: false, require_himself: true
    field :last_login_at, GraphQL::Types::ISO8601DateTime
    field :status, EnumTypes::User::StatusEnum, null: false

    field :profile, ObjectTypes::ProfileType, null: true

    def profile
      Loaders::AssociationLoader.for(User, :profile).load(object)
    end
  end
end
