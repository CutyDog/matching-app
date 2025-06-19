# frozen_string_literal: true

module ObjectTypes
  class UserType < ::Types::BaseObject
    field :id, ID, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :name, String, null: false
    field :email, String, null: true, require_himself: true
    field :password_digest, String, null: true, require_himself: true
    field :last_login_at, GraphQL::Types::ISO8601DateTime
    field :status, EnumTypes::User::UserStatusEnum, null: false
    field :admin, Boolean, null: false

    field :profile, ObjectTypes::ProfileType, null: true
    field :active_likes, [ObjectTypes::LikeType], null: true, require_himself: true
    field :passive_likes, [ObjectTypes::LikeType], null: true, require_himself: true
    field :matches, [ObjectTypes::LikeType], null: true, require_himself: true

    def profile
      Loaders::AssociationLoader.for(User, :profile).load(object)
    end

    def active_likes
      Loaders::AssociationLoader.for(User, :active_likes).load(object)
    end

    def passive_likes
      Loaders::AssociationLoader.for(User, :passive_likes).load(object)
    end

    def matches
      Loaders::AssociationLoader.for(User, :active_matches).load(object) do |active_matches|
        Loaders::AssociationLoader.for(User, :passive_matches).load_many(object) do |passive_matches|
          (active_matches + passive_matches).sort_by(&:accepted_at).reverse
        end
      end
    end
  end
end
