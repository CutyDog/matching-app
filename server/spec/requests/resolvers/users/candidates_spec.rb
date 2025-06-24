require 'rails_helper'

RSpec.describe Resolvers::Users::Candidates, type: :request do
  subject { post_graphql(query, headers:) }

  let(:query) do
    <<~GRAPHQL
      query {
        candidates {
          nodes {
            id
            name
            profile {
              avatarUrl
            }
            likesMe
          }
        }
      }
    GRAPHQL
  end

  let_it_be(:user) { create(:user) }
  let_it_be(:candidates) do
    5.times.map { |i| create(:user, :with_profile, last_login_at: i.days.ago) }
  end
  let_it_be(:active_like) { create(:like, :pending, sender: user, receiver: candidates[0]) }
  let_it_be(:passive_like) { create(:like, :pending, sender: candidates[2], receiver: user) }
  let_it_be(:matched_like) { create(:like, :accepted, sender: user, receiver: candidates[3]) }

  context 'when user is signed in' do
    let(:headers) { signed_in_header(user) }
    let(:expected_data) do
      {
        candidates: {
          nodes: [candidates[1], candidates[2], candidates[4]].sort_by(&:last_login_at).reverse.map do |candidate|
            {
              id: candidate.id.to_s,
              name: candidate.name,
              profile: {
                avatarUrl: candidate.profile.avatar_url
              },
              likesMe: candidate.id == user.id ? false : candidate.active_likes.exists?(receiver: user)
            }
          end
        }
      }
    end

    it 'returns candidates' do
      subject
      expect(response_errors).to be_nil
      expect(response_data.deep_symbolize_keys).to eq expected_data
    end
  end
end