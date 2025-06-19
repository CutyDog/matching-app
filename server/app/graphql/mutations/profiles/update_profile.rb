module Mutations
  module Profiles
    class UpdateProfile < SignInRequiredMutation
      field :profile, ObjectTypes::ProfileType, null: true

      argument :birthday, GraphQL::Types::ISO8601Date, required: false
      argument :gender, EnumTypes::Profile::ProfileGenderEnum, required: false
      argument :introduction, String, required: false

      def resolve(**args)
        current_user.profile.update!(args)

        { profile: current_user.profile }
      end
    end
  end
end