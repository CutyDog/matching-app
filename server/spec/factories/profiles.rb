# == Schema Information
#
# Table name: profiles
#
#  id           :bigint           not null, primary key
#  avatar_url   :string
#  birthday     :date             not null
#  gender       :integer          default("male"), not null
#  introduction :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_profiles_on_gender   (gender)
#  index_profiles_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :profile do
    birthday { Faker::Date.birthday(min_age: 18, max_age: 65) }
    introduction { Faker::Lorem.sentence }

    user
  end
end
