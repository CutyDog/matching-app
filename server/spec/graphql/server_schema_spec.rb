require 'rails_helper'

RSpec.describe ServerSchema do
  describe 'GraphQL Schema file' do
    it 'is up to date' do
      current_defn = described_class.to_definition
      printout_defn = Rails.root.join('app/graphql/server_schema.graphql').read
      expect(current_defn).to eq(printout_defn), 'Update the printed schema with `bundle exec rake graphql:schema:idl`'
    end
  end
end