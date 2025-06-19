require 'rails_helper'

RSpec.describe Mutations::Auth::SignUp, type: :request do
  subject { post_graphql(query, variables:, headers: {}) }

  let(:query) do
    <<~GRAPHQL
      mutation signUp($name: String!, $email: String!, $password: String!) {
        signUp(input: { name: $name, email: $email, password: $password }) {
          user {
            id
            name
            email
            lastLoginAt
          }
          token
        }
      }
    GRAPHQL
  end

  let(:variables) { { name: 'test', email: 'test@example.com', password: 'password' } }
  let(:jwt_token) { 'token' }

  before do
    allow_any_instance_of(User).to receive(:issue_jwt_token).and_return(jwt_token)
  end

  context 'when the user is created' do
    it 'returns a user and a token' do
      expect { subject }.to change(User, :count).by(1)
      expect(response_errors).to be_nil
      expect(response_data['signUp']['user']['id']).to eq User.last.id.to_s
      expect(response_data['signUp']['user']['name']).to eq 'test'
      expect(response_data['signUp']['user']['email']).to eq 'test@example.com'
      expect(response_data['signUp']['user']['lastLoginAt']).to eq User.last.last_login_at.iso8601
      expect(response_data['signUp']['token']).to eq jwt_token
    end
  end

  context 'when the user is not created' do
    let(:variables) { { name: '', email: 'test@example.com', password: 'password' } }

    it 'returns an error' do
      subject
      expect(response_errors).to be_present
      expect(response_errors.first['message']).to eq 'Name can\'t be blank'
    end
  end
end