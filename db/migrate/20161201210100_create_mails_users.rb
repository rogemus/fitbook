class CreateMailsUsers < ActiveRecord::Migration[5.0]
  def change
    create_join_table :mails, :users do |t|
      t.index [:mail_id, :user_id], unique: true
    end

    add_foreign_key :mails_users, :mails
    add_foreign_key :mails_users, :users
  end
end
