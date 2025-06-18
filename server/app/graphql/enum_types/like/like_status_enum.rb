module EnumTypes
  module Like
    class LikeStatusEnum < ::Types::BaseEnum
      value 'PENDING', value: 'pending'
      value 'ACCEPTED', value: 'accepted'
      value 'REJECTED', value: 'rejected'
    end
  end
end