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
          activeLikes {
            id
            status
          }
          passiveLikes {
            id
            status
          }
          matches {
            id
            status
            partner {
              id
              name
            }
          }
        }
      }
    GRAPHQL
  end

  let(:user) { create(:user, :with_profile) }

  context 'when user is signed in' do
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

  context 'when matched partner exists' do
    let(:headers) { signed_in_header(user) }
    let(:other_user) { create(:user) }
    let!(:like) { create(:like, :accepted, sender: user, receiver: other_user) }

    it 'returns the matched partner' do
      subject
      expect(response_errors).to be_nil
      expect(response_data['currentAccount']['matches'][0]['status']).to eq like.status.upcase
      expect(response_data['currentAccount']['matches'][0]['partner']['id']).to eq other_user.id.to_s
      expect(response_data['currentAccount']['matches'][0]['partner']['name']).to eq other_user.name
    end
  end
end