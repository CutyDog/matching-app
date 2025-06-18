# frozen_string_literal: true

module Types
  class BaseField < GraphQL::Schema::Field
    argument_class Types::BaseArgument

    def initialize(*args, require_admin: false, require_himself: false, **kwargs, &block)
      @require_admin = require_admin
      @require_himself = require_himself
      super(*args, **kwargs, &block)
    end

    def authorized?(obj, args, ctx)
      super && filter_require_admin(ctx) && filter_require_himself(ctx, obj)
    end

    def visible?(ctx)
      super && filter_require_admin(ctx)
    end

    private

    def filter_require_admin(ctx)
      return true unless @require_admin

      # admin のみアクセス可能
      ctx[:current_user]&.admin?
    end

    def filter_require_himself(ctx, obj)
      return true unless @require_himself

      user = obj.is_a?(User) ? obj : obj.try(:user)

      # user に紐づくオブジェクトではない場合、エラーを返す
      raise GraphQL::ExecutionError, 'not authorized' unless user

      # 本人のみアクセス可能
      ctx[:current_user] == user
    end
  end
end
