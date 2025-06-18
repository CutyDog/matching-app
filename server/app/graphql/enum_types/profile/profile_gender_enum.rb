module EnumTypes
  module Profile
    class ProfileGenderEnum < ::Types::BaseEnum
      value 'MALE', value: 'male'
      value 'FEMALE', value: 'female'
      value 'OTHER', value: 'other'
    end
  end
end