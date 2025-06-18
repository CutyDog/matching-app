create_table :matches do |t|
  t.bigint :user1_id, null: false
  t.bigint :user2_id, null: false

  t.index [:user1_id, :user2_id], unique: true

  t.datetime :matched_at, null: false
  t.timestamps
end

add_foreign_key :matches, :users, column: :user1_id
add_foreign_key :matches, :users, column: :user2_id