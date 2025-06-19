create_table :likes do |t|
  t.bigint :sender_id, null: false
  t.bigint :receiver_id, null: false
  t.integer :status, null: false, default: 0, index: true
  t.datetime :accepted_at, null: true

  t.index [:sender_id, :receiver_id], unique: true

  t.timestamps
end

add_foreign_key :likes, :users, column: :sender_id
add_foreign_key :likes, :users, column: :receiver_id