create_table :profiles, force: :cascade do |t|
  t.date :birthday, null: false
  t.integer :gender, null: false, default: 0, index: true
  t.text :introduction

  t.timestamps

  t.references :user, null: false, foreign_key: true
end