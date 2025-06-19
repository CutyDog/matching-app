# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 0) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "likes", force: :cascade do |t|
    t.bigint "sender_id", null: false
    t.bigint "receiver_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0, null: false
    t.datetime "accepted_at"
    t.index ["sender_id", "receiver_id"], name: "index_likes_on_sender_id_and_receiver_id", unique: true
    t.index ["status"], name: "index_likes_on_status"
  end

  create_table "matches", force: :cascade do |t|
    t.datetime "matched_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user1_id", null: false
    t.bigint "user2_id", null: false
    t.index ["user1_id", "user2_id"], name: "index_matches_on_user1_id_and_user2_id", unique: true
  end

  create_table "profiles", force: :cascade do |t|
    t.date "birthday", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.integer "gender", default: 0, null: false
    t.text "introduction"
    t.index ["gender"], name: "index_profiles_on_gender"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "last_login_at"
    t.boolean "admin", default: false, null: false
    t.integer "status", default: 0, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["status"], name: "index_users_on_status"
  end

  add_foreign_key "likes", "users", column: "receiver_id"
  add_foreign_key "likes", "users", column: "sender_id"
  add_foreign_key "matches", "users", column: "user1_id"
  add_foreign_key "matches", "users", column: "user2_id"
  add_foreign_key "profiles", "users"
end
