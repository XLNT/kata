# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180506060855) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "campaigns", force: :cascade do |t|
    t.boolean "open", default: true
    t.string "code", null: false
    t.bigint "token_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token_id"], name: "index_campaigns_on_token_id"
  end

  create_table "codes", force: :cascade do |t|
    t.string "code", null: false
    t.bigint "token_id", null: false
    t.boolean "consumed", default: false, null: false
    t.date "consumed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_codes_on_code", unique: true
    t.index ["consumed"], name: "index_codes_on_consumed"
    t.index ["token_id"], name: "index_codes_on_token_id"
  end

  create_table "mintable_tokens", force: :cascade do |t|
    t.string "address", null: false
    t.jsonb "metadata_cache", default: "{}", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
