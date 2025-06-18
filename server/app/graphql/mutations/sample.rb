module Mutations
  class Sample < BaseMutation
    field :message, String, null: false

    argument :name, String, required: true

    def resolve(name:)
      { message: "Hello, #{name}!" }
    end
  end
end