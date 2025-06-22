# frozen_string_literal: true

module Types
  class SubscriptionType < Types::BaseObject
    field :sample, subscription: Subscriptions::Sample
    field :chat_message_was_posted, subscription: Subscriptions::ChatMessageWasPosted
  end
end