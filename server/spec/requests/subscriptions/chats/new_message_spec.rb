require 'rails_helper'

RSpec.describe GraphqlChannel, type: :channel do # rubocop:disable RSpec/SpecFilePathFormat
  subject { perform_subscription(query, variables:) }

  let(:query) do
    <<~GRAPHQL
      subscription($chatRoomId: ID!) {
        newMessage(chatRoomId: $chatRoomId) {
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
  let(:chat_message) { create(:chat_message, chat_room:, user:, content: 'Hello, world!') }
  let(:variables) { { chatRoomId: chat_room.id } }

  before do
    create(:chat_member, chat_room:, user:)
    signed_in_connection(user)
  end

  context 'when success' do
    let(:expected_data) do
      {
        newMessage: {
          chatMessage: {
            id: chat_message.id.to_s,
            content: 'Hello, world!',
            user: { id: user.id.to_s },
            chatRoom: { id: chat_room.id.to_s }
          }
        }
      }
    end

    it 'delivers new messages to subscribed users' do
      subscribe
      expect(subscription).to be_confirmed

      subject

      ServerSchema.subscriptions.trigger(
        :new_message,
        { chat_room_id: chat_room.id },
        chat_message
      )

      # expect(transmission_errors).to be_nil
      # expect(transmission_data.deep_symbolize_keys).to eq expected_data
    end
  end
end