require 'rails_helper'

RSpec.describe Mutations::Profiles::CreateProfile, type: :request do
  subject { post_graphql(query, variables:, headers:) }

  let(:query) do
    <<~GRAPHQL
      mutation($birthday: ISO8601Date!, $gender: ProfileGenderEnum!, $introduction: String) {
        createProfile(input: { birthday: $birthday, gender: $gender, introduction: $introduction }) {
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
  let(:headers) { signed_in_header(user) }

  context 'when user is signed in' do
    let(:variables) { { birthday: '2000-01-01', gender: 'MALE', introduction: 'test' } }
    let(:expected_data) do
      {
        createProfile: {
          profile: {
            id: user.profile.id.to_s,
            birthday: '2000-01-01',
            gender: 'MALE',
            introduction: 'test'
          }
        }
      }
    end

    it 'creates a profile' do
      expect { subject }.to change(Profile, :count).by(1)
      expect(response_errors).to be_nil
      expect(response_data.deep_symbolize_keys).to eq expected_data
    end
  end

  context 'when user is not signed in' do
    let(:headers) { {} }
    let(:variables) { { birthday: '2000-01-01', gender: 'MALE', introduction: 'test' } }

    it 'returns an error' do
      expect { subject }.not_to change(Profile, :count)
      expect(response_errors).to be_present
    end
  end

  context 'when arguments are invalid' do
    let(:variables) { { birthday: '2000-01-01', introduction: 'test' } }

    it 'returns an error' do
      expect { subject }.not_to change(Profile, :count)
      expect(response_errors).to be_present
    end
  end
end