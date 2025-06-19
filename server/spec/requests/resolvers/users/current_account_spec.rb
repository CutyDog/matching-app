require 'rails_helper'

RSpec.describe Resolvers::Users::CurrentAccount, type: :request do
  subject { post_graphql(query, headers:) }

  let(:query) do
    <<~GRAPHQL
      query {
        currentAccount {
          id
          name
          status
          profile {
            id
            birthday
            gender
          }
          activeLikes {
            id
            status
            receiver {
              id
              name
            }
          }
          passiveLikes {
            id
            status
            sender {
              id
              name
            }
          }
          matches {
            id
            status
            partner {
              id
              name
            }
          }
        }
      }
    GRAPHQL
  end

  let(:user) { create(:user, :with_profile) }
  let(:active_like_user) { create(:user) }
  let!(:active_like) { create(:like, :pending, sender: user, receiver: active_like_user) }
  let(:passive_like_user) { create(:user) }
  let!(:passive_like) { create(:like, :pending, sender: passive_like_user, receiver: user) }
  let(:matched_user) { create(:user) }
  let!(:matched_like) { create(:like, :accepted, sender: user, receiver: matched_user) }

  context 'when user is signed in' do
    let(:headers) { signed_in_header(user) }
    let(:expected_data) do
      {
        currentAccount: {
          id: user.id.to_s,
          name: user.name,
          status: user.status.upcase,
          profile: {
            id: user.profile.id.to_s,
            birthday: user.profile.birthday.to_s,
            gender: user.profile.gender.upcase
          },
          activeLikes: [
            {
              id: active_like.id.to_s,
              status: active_like.status.upcase,
              receiver: {
                id: active_like_user.id.to_s,
                name: active_like_user.name
              }
            }
          ],
          passiveLikes: [
            {
              id: passive_like.id.to_s,
              status: passive_like.status.upcase,
              sender: {
                id: passive_like_user.id.to_s,
                name: passive_like_user.name
              }
            }
          ],
          matches: [
            {
              id: matched_like.id.to_s,
              status: matched_like.status.upcase,
              partner: {
                id: matched_user.id.to_s,
                name: matched_user.name
              }
            }
          ]
        }
      }
    end

    it 'returns the current user' do
      subject
      expect(response_errors).to be_nil
      expect(response_data.deep_symbolize_keys).to eq expected_data
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