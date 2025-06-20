# frozen_string_literal: true

module ObjectTypes
  class LikeType < ::Types::BaseObject
    field :id, ID, null: false
    field :sender_id, Integer, null: false
    field :receiver_id, Integer, null: false
    field :status, EnumTypes::Like::LikeStatusEnum, null: false
    field :accepted_at, GraphQL::Types::ISO8601DateTime, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :sender, ObjectTypes::UserType, null: false
    field :receiver, ObjectTypes::UserType, null: false
    field :partner, ObjectTypes::UserType, null: true

    def sender
      Loaders::AssociationLoader.for(Like, :sender).load(object)
    end

    def receiver
      Loaders::AssociationLoader.for(Like, :receiver).load(object)
    end

    def partner
      sender.then do |sender|
        receiver.then do |receiver|
          [sender, receiver].find { |user| user.id != current_user&.id }
        end
      end
    end
  end
end