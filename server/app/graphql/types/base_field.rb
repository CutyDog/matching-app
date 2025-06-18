# frozen_string_literal: true

module Types
  class BaseField < GraphQL::Schema::Field
    argument_class Types::BaseArgument

    def initialize(*args, require_admin: false, **kwargs, &block)
      @require_admin = require_admin
      super(*args, **kwargs, &block)
    end

    def authorized?(obj, args, ctx)
      super && (@require_admin ? ctx[:current_user]&.admin? : true)
    end

    def visible?(ctx)
      super && (@require_admin ? ctx[:current_user]&.admin? : true)
    end
  end
end
