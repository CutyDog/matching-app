require 'rails_helper'

RSpec.describe Resolvers::User::CurrentAccount, type: :request do
  subject { post_graphql(query, headers:) }

  let(:query) do
    <<~GRAPHQL
      query {
        currentAccount {
          id
          name
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

  context 'when user is signed in' do
    let(:user) { create(:user, :with_profile) }
    let(:headers) { signed_in_header(user) }

    it 'returns the current user' do # rubocop:disable RSpec/ExampleLength
      subject
      expect(response_errors).to be_nil
      expect(response_data['currentAccount']['id']).to eq user.id.to_s
      expect(response_data['currentAccount']['name']).to eq user.name
      expect(response_data['currentAccount']['status']).to eq user.status.upcase
      expect(response_data['currentAccount']['profile']['id']).to eq user.profile.id.to_s
      expect(response_data['currentAccount']['profile']['birthday']).to eq user.profile.birthday.to_s
      expect(response_data['currentAccount']['profile']['gender']).to eq user.profile.gender.upcase
    end
  end

  context 'when user is not signed in' do
    let(:headers) { {} }

    it 'returns an error' do
      subject
      expect(response_errors).to be_present
      expect(response_errors.first['message']).to eq 'login required!!'
    end
  end
end