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

ActiveRecord::Schema.define(version: 20170107150230) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cities", force: :cascade do |t|
    t.string  "name"
    t.integer "country_id"
    t.index ["country_id"], name: "index_cities_on_country_id", using: :btree
    t.index ["name", "country_id"], name: "index_cities_on_name_and_country_id", unique: true, using: :btree
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",                      null: false
    t.string   "commentable_type",             null: false
    t.integer  "commentable_id",               null: false
    t.string   "body",             limit: 500, null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id", using: :btree
    t.index ["created_at"], name: "index_comments_on_created_at", using: :btree
    t.index ["user_id"], name: "index_comments_on_user_id", using: :btree
  end

  create_table "countries", force: :cascade do |t|
    t.string "name"
    t.index ["name"], name: "index_countries_on_name", unique: true, using: :btree
  end

  create_table "error_logs", force: :cascade do |t|
    t.string   "platform"
    t.text     "stack"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gyms", force: :cascade do |t|
    t.string   "name",                      null: false
    t.bigint   "facebook_id"
    t.string   "graph_token"
    t.integer  "owner_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "about"
    t.string   "description"
    t.string   "website"
    t.string   "picture"
    t.integer  "location_id"
    t.string   "cover"
    t.integer  "votes_count", default: 0
    t.float    "rating",      default: 0.0
    t.string   "hours"
    t.string   "parking"
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

  create_table "mailers", force: :cascade do |t|
    t.integer  "gym_id"
    t.text     "body"
    t.integer  "receivers",  default: 0
    t.datetime "created_at"
    t.datetime "send"
    t.index ["created_at"], name: "index_mailers_on_created_at", using: :btree
    t.index ["gym_id"], name: "index_mailers_on_gym_id", using: :btree
  end

  create_table "mailers_users", id: false, force: :cascade do |t|
    t.integer "mailer_id", null: false
    t.integer "user_id",   null: false
    t.index ["mailer_id", "user_id"], name: "index_mailers_users_on_mailer_id_and_user_id", unique: true, using: :btree
  end

  create_table "members", force: :cascade do |t|
    t.integer  "membership_level"
    t.boolean  "approved",         default: false
    t.integer  "user_id"
    t.integer  "gym_id"
    t.datetime "created_at"
    t.boolean  "mailing",          default: false, null: false
    t.index ["gym_id"], name: "index_members_on_gym_id", using: :btree
    t.index ["user_id", "gym_id"], name: "index_members_on_user_id_and_gym_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_members_on_user_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.integer  "author_id",                            null: false
    t.string   "title",       limit: 55,               null: false
    t.string   "heading",                              null: false
    t.text     "body",                                 null: false
    t.integer  "votes_count",            default: 0
    t.float    "rating",                 default: 0.0
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.index ["author_id"], name: "index_posts_on_author_id", using: :btree
  end

  create_table "posts_tags", id: false, force: :cascade do |t|
    t.integer "post_id", null: false
    t.integer "tag_id",  null: false
    t.index ["post_id", "tag_id"], name: "index_posts_tags_on_post_id_and_tag_id", unique: true, using: :btree
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
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
    t.integer  "votes_count", default: 0
    t.float    "rating",      default: 0.0
    t.string   "about"
    t.index ["facebook_id"], name: "index_users_on_facebook_id", using: :btree
  end

  create_table "votes", force: :cascade do |t|
    t.integer "user_id",                     null: false
    t.string  "voteable_type",               null: false
    t.integer "voteable_id",                 null: false
    t.float   "rating",        default: 0.0, null: false
    t.index ["user_id", "voteable_type", "voteable_id"], name: "index_votes_on_user_id_and_voteable_type_and_voteable_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_votes_on_user_id", using: :btree
    t.index ["voteable_type", "voteable_id"], name: "index_votes_on_voteable_type_and_voteable_id", using: :btree
  end

  add_foreign_key "comments", "users"
  add_foreign_key "gyms", "locations"
  add_foreign_key "mailers", "gyms"
  add_foreign_key "mailers_users", "mailers"
  add_foreign_key "mailers_users", "users"
  add_foreign_key "posts_tags", "posts"
  add_foreign_key "posts_tags", "tags"
  add_foreign_key "votes", "users"
end
