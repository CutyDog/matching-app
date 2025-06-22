# frozen_string_literal: true

module Types
  class SubscriptionType < Types::BaseObject
    field :sample, subscription: Subscriptions::Sample
  end
end