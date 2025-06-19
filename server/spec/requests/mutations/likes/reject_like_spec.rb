require 'rails_helper'

RSpec.describe Mutations::Likes::RejectLike, type: :request do
  subject { post_graphql(query, variables:, headers:) }

  let(:query) do
    <<~GRAPHQL
      mutation($likeId: ID!) {
        rejectLike(input: { likeId: $likeId }) {
          like {
            id
            status
            receiver {
              id
            }
          }
        }
      }
    GRAPHQL
  end

  let(:user) { create(:user) }
  let(:headers) { signed_in_header(user) }

  context 'when success' do
    let(:like) { create(:like, receiver: user) }
    let(:variables) { { likeId: like.id } }
    let(:expected_data) do
      {
        rejectLike: {
          like: {
            id: like.id.to_s,
            status: 'REJECTED',
            receiver: {
              id: user.id.to_s
            }
          }
        }
      }
    end

    it 'rejects a like' do
      expect { subject }.to change { like.reload.status }.from('pending').to('rejected')
      expect(response_errors).to be_nil
      expect(response_data.deep_symbolize_keys).to eq expected_data
    end
  end

  context 'when not the receiver' do
    let(:like) { create(:like, receiver: create(:user)) }
    let(:variables) { { likeId: like.id } }

    it 'returns an error' do
      expect { subject }.not_to(change { like.reload.status })
      expect(response_errors).to be_present
    end
  end
end