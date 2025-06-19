require 'rails_helper'

RSpec.describe Mutations::Users::DeactivateAccount, type: :request do
  subject { post_graphql(query, variables:, headers:) }

  let(:query) do
    <<~GRAPHQL
      mutation($confirm: Boolean!) {
        deactivateAccount(input: { confirm: $confirm }) {
          user {
            id
            status
          }
        }
      }
    GRAPHQL
  end

  let(:user) { create(:user) }
  let(:headers) { signed_in_header(user) }
  let(:variables) { { confirm: true } }

  context 'when user is signed in' do
    let(:expected_data) do
      {
        deactivateAccount: {
          user: {
            id: user.id.to_s,
            status: 'INACTIVE'
          }
        }
      }
    end

    it 'deactivates the user' do
      expect { subject }.to change { user.reload.status }.from('active').to('inactive')
      expect(response_errors).to be_nil
      expect(response_data.deep_symbolize_keys).to eq expected_data
    end
  end
end