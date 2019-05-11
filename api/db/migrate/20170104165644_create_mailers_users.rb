class CreateMailersUsers < ActiveRecord::Migration[5.0]
  def change
    drop_table :mails_users
    drop_table :mails

    create_table :mailers do |t|

      t.references :gym, index: true
      t.text :body

      t.integer :receivers, default: 0

      t.datetime :scheduled, null: false
      t.datetime :created_at, index: true
    end

    add_foreign_key :mailers, :gyms

    create_join_table :mailers, :users do |t|
      t.index [:mailer_id, :user_id], unique: true
    end

    add_foreign_key :mailers_users, :mailers
    add_foreign_key :mailers_users, :users
  end
end
