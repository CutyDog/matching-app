require 'rails_helper'

RSpec.describe LikeService, type: :service do
  let(:sender) { create(:user) }
  let(:receiver) { create(:user) }

  describe '#call' do
    subject { described_class.new(sender:, receiver:).call }

    context 'when sender and receiver are the same user' do
      let(:sender) { receiver }

      it 'returns self_like' do
        expect(subject).to eq LikeService::RESPONSE_CODE[:self_like]
      end

      it 'does not change Like count' do
        expect { subject }.not_to change(Like, :count)
      end
    end

    context 'when receiver has not liked sender' do
      it 'returns sent' do
        expect(subject).to eq LikeService::RESPONSE_CODE[:sent]
      end

      it 'creates a like' do
        expect { subject }.to change(Like, :count).by(1)
      end
    end

    context 'when sender has already liked receiver' do
      before do
        create(:like, sender:, receiver:)
      end

      it 'returns already_liked' do
        expect(subject).to eq LikeService::RESPONSE_CODE[:already_liked]
      end

      it 'does not change Like count' do
        expect { subject }.not_to change(Like, :count)
      end
    end

    context 'when receiver has already liked sender' do
      before do
        create(:like, sender: receiver, receiver: sender)
      end

      it 'returns matched' do
        expect(subject).to eq LikeService::RESPONSE_CODE[:matched]
      end

      it 'creates a like and a match' do
        expect { subject }.to change(Like, :count).by(1).and change(Match, :count).by(1)
      end
    end

    context 'when an error occurs' do
      before do
        allow(Like).to receive(:create).and_raise(StandardError, 'test error')
        allow(Rails.logger).to receive(:error)
      end

      it 'returns error' do
        expect(subject).to eq LikeService::RESPONSE_CODE[:error]
      end

      it 'logs the error' do
        subject
        expect(Rails.logger).to have_received(:error).with('Error in LikeService: test error')
      end
    end
  end
end