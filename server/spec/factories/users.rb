# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean          default(FALSE), not null
#  email           :string           not null
#  last_login_at   :datetime
#  name            :string           not null
#  password_digest :string           not null
#  status          :integer          default("active"), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email   (email) UNIQUE
#  index_users_on_name    (name) UNIQUE
#  index_users_on_status  (status)
#
FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { Faker::Internet.password }

    trait :with_profile do
      transient do
        profile_attributes { {} }
      end

      after(:create) do |user, evaluator|
        create(:profile, user:, **evaluator.profile_attributes)
      end
    end
  end
end
