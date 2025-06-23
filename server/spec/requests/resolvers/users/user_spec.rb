require 'rails_helper'

RSpec.describe Resolvers::Users::User, type: :request do
  subject { post_graphql(query, variables:, headers:) }

  let(:query) do
    <<~GRAPHQL
      query($id: ID!) {
        user(id: $id) {
          id
          name
          email
          status
          profile {
            id
            birthday
            gender
          }
        }
      }
    GRAPHQL
  end

  let(:user) { create(:user, :with_profile) }
  let(:user2) { create(:user, :with_profile) }
  let(:headers) { signed_in_header(user) }

  context 'when user is me' do
    let(:variables) { { id: user.id } }
    let(:expected_data) do
      {
        user: {
          id: user.id.to_s,
          name: user.name,
          email: user.email,
          status: user.status.upcase,
          profile: {
            id: user.profile.id.to_s,
            birthday: user.profile.birthday.iso8601,
            gender: user.profile.gender.upcase,
          }
        }
      }
    end

    it 'returns the user' do
      subject
      expect(response_errors).to be_nil
      expect(response_data.deep_symbolize_keys).to eq expected_data
    end
  end

  context 'when user is not me' do
    let(:variables) { { id: user2.id } }
    let(:expected_data) do
      {
        user: {
          id: user2.id.to_s,
          name: user2.name,
          email: nil,
          status: user2.status.upcase,
          profile: {
            id: user2.profile.id.to_s,
            birthday: user2.profile.birthday.iso8601,
            gender: user2.profile.gender.upcase,
          }
        }
      }
    end

    it 'returns the user' do
      subject
      expect(response_errors).to be_nil
      expect(response_data.deep_symbolize_keys).to eq expected_data
    end
  end

  context 'when user is not found' do
    let(:variables) { { id: 'invalid_id' } }

    it 'returns an error' do
      subject
      expect(response_errors).to be_present
    end
  end
end