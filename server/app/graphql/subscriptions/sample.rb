module Subscriptions
  class Sample < SignInRequiredSubscription
    field :sample, String, null: false

    argument :name, String, required: true

    def subscribe(name:)
      { sample: "Hello, #{name}!" }
    end

    def update(name:)
      { sample: "Hello, #{name}!" }
    end
  end
end