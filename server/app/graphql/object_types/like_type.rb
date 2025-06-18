# frozen_string_literal: true

module ObjectTypes
  class LikeType < ::Types::BaseObject
    field :id, ID, null: false
    field :sender_id, Integer, null: false
    field :receiver_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :sender, ObjectTypes::UserType, null: false
    field :receiver, ObjectTypes::UserType, null: false

    def sender
      Loaders::AssociationLoader.for(Like, :sender).load(object)
    end

    def receiver
      Loaders::AssociationLoader.for(Like, :receiver).load(object)
    end
  end
end