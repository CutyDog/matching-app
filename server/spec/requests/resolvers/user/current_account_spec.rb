require 'rails_helper'

RSpec.describe Resolvers::User::CurrentAccount, type: :request do
  subject { post_graphql(query, headers:) }

  let(:query) do
    <<~GRAPHQL
      query {
        currentAccount {
          id
        }
      }
    GRAPHQL
  end

  context 'when user is signed in' do
    let(:user) { create(:user) }
    let(:headers) { signed_in_header(user) }

    it 'returns the current user' do
      subject
      expect(response_errors).to be_nil
      expect(response_data['currentAccount']['id']).to eq user.id.to_s
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