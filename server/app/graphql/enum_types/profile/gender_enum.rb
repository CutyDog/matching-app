module EnumTypes
  module Profile
    class GenderEnum < ::Types::BaseEnum
      value 'MALE', value: 'male'
      value 'FEMALE', value: 'female'
      value 'OTHER', value: 'other'
    end
  end
end