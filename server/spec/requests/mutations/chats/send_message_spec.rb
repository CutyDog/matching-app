require 'rails_helper'

RSpec.describe Mutations::Chats::SendMessage, type: :request do
  subject { post_graphql(query, variables:, headers:) }

  let(:query) do
    <<~GRAPHQL
      mutation($chatRoomId: ID!, $content: String!) {
        sendChatMessage(input: { chatRoomId: $chatRoomId, content: $content }) {
          chatMessage {
            id
            content
            user {
              id
            }
            chatRoom {
              id
            }
          }
        }
      }
    GRAPHQL
  end

  let(:chat_room) { create(:chat_room) }
  let(:user) { create(:user) }
  let(:headers) { signed_in_header(user) }
  let(:variables) { { chatRoomId: chat_room.id, content: } }
  let(:subscriptions) { class_double('ServerSchema.subscriptions') } # rubocop:disable RSpec/VerifiedDoubleReference

  before do
    create(:chat_member, user:, chat_room:)
    allow(ServerSchema).to receive(:subscriptions).and_return(subscriptions)
    allow(subscriptions).to receive(:trigger)
  end

  context 'when success' do
    let(:content) { 'Hello, world!' }
    let(:expected_data) do
      {
        sendChatMessage: {
          chatMessage: {
            id: ChatMessage.last.id.to_s,
            content:,
            user: { id: user.id.to_s },
            chatRoom: { id: chat_room.id.to_s }
          }
        }
      }
    end

    it 'sends a message and triggers subscription' do
      expect { subject }.to change(ChatMessage, :count).by(1)
      expect(subscriptions).to have_received(:trigger).with(
        :new_message,
        { chat_room_id: chat_room.id },
        an_instance_of(ChatMessage)
      )
      expect(response_errors).to be_nil
      expect(response_data.deep_symbolize_keys).to eq expected_data
    end
  end

  context 'when user is not a participant' do
    let(:headers) { signed_in_header(create(:user)) }
    let(:content) { 'Trying to hack in!' }

    it 'returns an error and does not send a message' do
      expect { subject }.not_to change(ChatMessage, :count)
      expect(subscriptions).not_to have_received(:trigger)
      expect(response_errors).to be_present
      expect(response_errors.first['message']).to eq 'You are not a participant of this chat room.'
    end
  end

  context 'with invalid chat room id' do
    let(:variables) { { chatRoomId: 'invalid_id', content: 'test' } }

    it 'returns an error' do
      expect { subject }.not_to change(ChatMessage, :count)
      expect(subscriptions).not_to have_received(:trigger)
      expect(response_errors).to be_present
    end
  end
end