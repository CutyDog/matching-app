require 'rails_helper'

RSpec.describe Mutations::Auth::SignIn, type: :request do
  subject { post_graphql(query, variables:, headers: {}) }

  let(:query) do
    <<~GRAPHQL
      mutation signIn($email: String!, $password: String!) {
        signIn(input: { email: $email, password: $password }) {
          token
        }
      }
    GRAPHQL
  end

  let(:user) { create(:user) }
  let(:jwt_token) { 'token' }

  before do
    allow_any_instance_of(User).to receive(:issue_jwt_token).and_return(jwt_token)
  end

  context 'when the user is found' do
    let(:variables) { { email: user.email, password: user.password } }

    it 'returns a token' do
      expect { subject }.to change { user.reload.last_login_at }.from(nil).to(be_present)
      expect(response_errors).to be_nil
      expect(response_data['signIn']['token']).to eq jwt_token
    end
  end

  context 'when the user is not found' do
    let(:variables) { { email: 'invalid@example.com', password: 'password' } }

    it 'returns an error' do
      subject
      expect(response_errors).to be_present
      expect(response_errors.first['message']).to eq 'User not found by email'
    end
  end

  context 'when the password is incorrect' do
    let(:variables) { { email: user.email, password: 'invalid' } }

    it 'returns an error' do
      subject
      expect(response_errors).to be_present
      expect(response_errors.first['message']).to eq 'Invalid email or password'
    end
  end
end