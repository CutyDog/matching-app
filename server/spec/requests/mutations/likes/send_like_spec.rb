require 'rails_helper'

RSpec.describe Mutations::Likes::SendLike, type: :request do
  subject { post_graphql(query, variables:, headers:) }

  let(:query) do
    <<~GRAPHQL
      mutation($receiverId: ID!) {
        sendLike(input: { receiverId: $receiverId }) {
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
    let(:receiver) { create(:user) }
    let(:variables) { { receiverId: receiver.id } }
    let(:expected_data) do
      {
        sendLike: {
          like: {
            id: user.active_likes.last.id.to_s,
            status: 'PENDING',
            receiver: {
              id: receiver.id.to_s
            }
          }
        }
      }
    end

    it 'sends a like' do
      expect { subject }.to change(Like, :count).by(1)
      expect(response_errors).to be_nil
      expect(response_data.deep_symbolize_keys).to eq expected_data
    end
  end

  context 'when already sent' do
    let(:receiver) { create(:user) }
    let(:variables) { { receiverId: receiver.id } }

    before { create(:like, sender: user, receiver:) }

    it 'returns an error' do
      expect { subject }.not_to change(Like, :count)
      expect(response_errors).to be_present
    end
  end
end