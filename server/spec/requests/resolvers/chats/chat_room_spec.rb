require 'rails_helper'

RSpec.describe Resolvers::Chats::ChatRoom, type: :request do
  subject { post_graphql(query, variables:, headers:) }

  let(:query) do
    <<~GRAPHQL
      query($id: ID!) {
        chatRoom(id: $id) {
          id
          chatMessages {
            id
            content
            user {
              id
              name
            }
          }
        }
      }
    GRAPHQL
  end

  let(:chat_room) { create(:chat_room) }
  let(:user) { create(:user) }
  let(:headers) { signed_in_header(user) }
  let(:variables) { { id: chat_room.id } }

  context 'when user is a participant' do
    before do
      create(:chat_member, chat_room:, user:)
    end

    let(:expected_data) do
      {
        chatRoom: {
          id: chat_room.id.to_s,
          chatMessages: []
        }
      }
    end

    it 'returns the chat room' do
      subject
      expect(response_errors).to be_nil
      expect(response_data.deep_symbolize_keys).to eq expected_data
    end
  end

  context 'when user is not a participant' do
    it 'returns nil' do
      subject
      expect(response_errors).to be_present
      expect(response_errors.first['message']).to eq("You are not a participant of this chat room.")
    end
  end
end