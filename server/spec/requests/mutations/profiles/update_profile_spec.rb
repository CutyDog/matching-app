require 'rails_helper'

RSpec.describe Mutations::Profiles::UpdateProfile, type: :request do
  subject { post_graphql(query, variables:, headers:) }

  let(:query) do
    <<~GRAPHQL
      mutation($birthday: ISO8601Date, $gender: ProfileGenderEnum, $introduction: String) {
        updateProfile(input: { birthday: $birthday, gender: $gender, introduction: $introduction }) {
          profile {
            id
            birthday
            gender
            introduction
          }
        }
      }
    GRAPHQL
  end

  let(:user) { create(:user) }
  let!(:profile) { create(:profile, user:, introduction: 'test') }
  let(:headers) { signed_in_header(user) }

  context 'when user is signed in' do
    let(:variables) { { birthday: '2000-01-01', introduction: 'update test' } }
    let(:expected_data) do
      {
        updateProfile: {
          profile: {
            id: profile.id.to_s,
            birthday: '2000-01-01',
            gender: profile.gender.upcase,
            introduction: 'update test'
          }
        }
      }
    end

    it 'updates the profile' do
      expect { subject }.to change { user.profile.reload.introduction }.from('test').to('update test')
      expect(response_errors).to be_nil
      expect(response_data.deep_symbolize_keys).to eq expected_data
    end
  end
end