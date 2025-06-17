# frozen_string_literal: true

module Types
  class SubscriptionType < Types::BaseObject
    field :sample, String, null: false do
      argument :name, String, required: true
    end

    def sample(name:)
      "Hello, #{name}!"
    end
  end
end