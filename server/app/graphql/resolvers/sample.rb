module Resolvers
  class Sample < BaseResolver
    type String, null: false

    argument :name, String, required: true

    def resolve(name:)
      "Hello, #{name}!"
    end
  end
end