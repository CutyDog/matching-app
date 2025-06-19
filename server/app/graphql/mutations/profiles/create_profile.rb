module Mutations
  module Profiles
    class CreateProfile < SignInRequiredMutation
      field :profile, ObjectTypes::ProfileType, null: true

      argument :birthday, GraphQL::Types::ISO8601Date, required: true
      argument :gender, EnumTypes::Profile::ProfileGenderEnum, required: true
      argument :introduction, String, required: false

      def resolve(birthday:, gender:, introduction: nil)
        profile = current_user.create_profile!(birthday:, gender:, introduction:)

        { profile: }
      end
    end
  end
end