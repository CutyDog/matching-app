create_table :matches do |t|
  t.bigint :user_1_id, null: false
  t.bigint :user_2_id, null: false

  t.index [:user_1_id, :user_2_id], unique: true

  t.datetime :matched_at, null: false
  t.timestamps
end

add_foreign_key :matches, :users, column: :user_1_id
add_foreign_key :matches, :users, column: :user_2_id