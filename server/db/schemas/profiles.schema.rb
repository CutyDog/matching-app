create_table :profiles, force: :cascade do |t|
  t.date :birthday, null: false
  t.string :gender, null: false

  t.timestamps

  t.references :user, null: false, foreign_key: true
end