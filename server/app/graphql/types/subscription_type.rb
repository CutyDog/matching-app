# frozen_string_literal: true

module Types
  class SubscriptionType < Types::BaseObject
    field :new_message, subscription: Subscriptions::Chats::NewMessage
  end
end