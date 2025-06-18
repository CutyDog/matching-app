# frozen_string_literal: true

module InputTypes
  class UserInputType < ::Types::BaseInputObject
    argument :id, ID, required: false
    argument :created_at, GraphQL::Types::ISO8601DateTime, required: false
    argument :updated_at, GraphQL::Types::ISO8601DateTime, required: false
    argument :name, String, required: false
    argument :email, String, required: false
    argument :password_digest, String, required: false
    argument :last_login_at, GraphQL::Types::ISO8601DateTime, required: false
  end
end
