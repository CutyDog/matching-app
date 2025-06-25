module Mutations
  module Profiles
    class CreateProfile < SignInRequiredMutation
      field :profile, ObjectTypes::ProfileType, null: true

      argument :birthday, GraphQL::Types::ISO8601Date, required: true
      argument :gender, EnumTypes::Profile::ProfileGenderEnum, required: true
      argument :introduction, String, required: false
      argument :avatar_url, String, required: false

      def resolve(**args)
        profile = current_user.create_profile!(**args)

        { profile: }
      end
    end
  end
end