# frozen_string_literal: true

module ObjectTypes
  class ProfileType < ::Types::BaseObject
    field :id, ID, null: false
    field :birthday, GraphQL::Types::ISO8601Date, null: false
    field :gender, EnumTypes::Profile::ProfileGenderEnum, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :user, ObjectTypes::UserType, null: false

    def user
      Loaders::AssociationLoader.for(Profile, :user).load(object)
    end
  end
end
