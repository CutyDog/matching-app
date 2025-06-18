create_table :users, force: :cascade do |t|
  t.string :name, null: false, index: { unique: true }
  t.string :email, null: false, index: { unique: true }
  t.string :password_digest, null: false
  t.datetime :last_login_at
  t.integer :status, null: false, default: 0, index: true
  t.boolean :admin, null: false, default: false

  t.timestamps
end