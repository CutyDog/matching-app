module EnumTypes
  module User
    class UserStatusEnum < ::Types::BaseEnum
      value 'ACTIVE', value: 'active'
      value 'INACTIVE', value: 'inactive'
    end
  end
end