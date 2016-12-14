class CreateMails < ActiveRecord::Migration[5.0]
  def change
    create_table :mails do |t|

      t.references :gym, index: true
      t.text :body

      t.integer :receivers, default: 0

      t.datetime :scheduled, null: false
      t.datetime :created_at, index: true
    end

    add_foreign_key :mails, :gym
  end
end
