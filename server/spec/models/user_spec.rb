# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean          default(FALSE), not null
#  email           :string           not null
#  last_login_at   :datetime
#  name            :string           not null
#  password_digest :string           not null
#  status          :integer          default("active"), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email   (email) UNIQUE
#  index_users_on_name    (name) UNIQUE
#  index_users_on_status  (status)
#
require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    subject { build(:user) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email) }
    it { is_expected.to validate_presence_of(:password) }
    it { is_expected.to define_enum_for(:status).with_values(active: 0, inactive: 1) }
    it { is_expected.to validate_inclusion_of(:admin).in_array([true, false]) }
  end

  describe '.authentication' do
    subject { user.authenticate(password) }

    let(:user) { create(:user, email: 'test@example.com', password: 'password') }

    context 'when password is correct' do
      let(:password) { 'password' }

      it do
        expect(subject).to be_truthy
      end
    end

    context 'when password is incorrect' do
      let(:password) { 'wrong_password' }

      it do
        expect(subject).to be_falsey
      end
    end
  end

  describe '.find_by_jwt!' do
    subject { described_class.find_by_jwt!(jwt_token) } # rubocop:disable Rails/DynamicFindBy

    let(:user) { create(:user, email: 'test@example.com', password: 'password') }

    context 'when the JWT token is valid' do
      let(:jwt_token) { user.issue_jwt_token }

      it do
        expect(subject).to eq(user)
      end
    end

    context 'when the JWT token cannot be decoded' do
      let(:jwt_token) { 'invalid_token' }

      it do
        expect { subject }.to raise_error(User::UnauthorizedError, 'Invalid JWT token')
      end
    end

    context 'when the JWT token is expired' do
      let(:jwt_token) do
        JWT.encode(
          { user_id: user.id, exp: 1.hour.ago.to_i },
          Rails.application.credentials.secret_key_base
        )
      end

      it do
        expect { subject }.to raise_error(User::UnauthorizedError, 'JWT token expired')
      end
    end

    context 'when user is not found' do
      let(:jwt_token) { user.issue_jwt_token }

      before do
        allow(described_class).to receive(:find).and_raise(ActiveRecord::RecordNotFound)
      end

      it do
        expect { subject }.to raise_error(User::UnauthorizedError, 'User not found')
      end
    end
  end
end
