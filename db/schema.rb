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

ActiveRecord::Schema.define(version: 20161112183203) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cities", force: :cascade do |t|
    t.string  "name"
    t.integer "country_id"
    t.index ["country_id"], name: "index_cities_on_country_id", using: :btree
    t.index ["name", "country_id"], name: "index_cities_on_name_and_country_id", unique: true, using: :btree
  end

  create_table "countries", force: :cascade do |t|
    t.string "name"
    t.index ["name"], name: "index_countries_on_name", unique: true, using: :btree
  end

  create_table "gyms", force: :cascade do |t|
    t.string   "name",        null: false
    t.bigint   "facebook_id"
    t.string   "graph_token"
    t.integer  "owner_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "about"
    t.string   "description"
    t.string   "website"
    t.string   "picture"
    t.integer  "location_id"
    t.string   "cover"
    t.index ["facebook_id"], name: "index_gyms_on_facebook_id", using: :btree
    t.index ["location_id"], name: "index_gyms_on_location_id", using: :btree
    t.index ["owner_id"], name: "index_gyms_on_owner_id", using: :btree
  end

  create_table "locations", force: :cascade do |t|
    t.string  "street"
    t.float   "latitude"
    t.float   "longitude"
    t.integer "city_id"
    t.integer "gym_id"
    t.index ["city_id"], name: "index_locations_on_city_id", using: :btree
    t.index ["gym_id"], name: "index_locations_on_gym_id", using: :btree
  end

  create_table "members", force: :cascade do |t|
    t.integer  "membership_level"
    t.boolean  "approved",         default: false
    t.integer  "user_id"
    t.integer  "gym_id"
    t.datetime "created_at"
    t.index ["gym_id"], name: "index_members_on_gym_id", using: :btree
    t.index ["user_id", "gym_id"], name: "index_members_on_user_id_and_gym_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_members_on_user_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.integer  "owner_id"
    t.string   "title"
    t.string   "heading"
    t.text     "body"
    t.integer  "votes_count"
    t.float    "rating"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["owner_id"], name: "index_posts_on_owner_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",                        null: false
    t.string   "phone"
    t.string   "email"
    t.bigint   "facebook_id"
    t.string   "graph_token"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "cover"
    t.string   "picture"
    t.boolean  "is_trainer",  default: false
    t.index ["facebook_id"], name: "index_users_on_facebook_id", using: :btree
  end

  add_foreign_key "gyms", "locations"
end
