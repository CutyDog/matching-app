module EnumTypes
  module User
    class StatusEnum < ::Types::BaseEnum
      value 'ACTIVE', value: :active
      value 'INACTIVE', value: :inactive
    end
  end
end