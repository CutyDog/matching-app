create_table :chat_members do |t|
  t.references :chat_room, null: false, foreign_key: true
  t.references :user, null: false, foreign_key: true

  t.timestamps

  t.index [:chat_room_id, :user_id], unique: true
end