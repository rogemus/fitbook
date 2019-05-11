class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|

      t.integer :membership_level, default: :regular
      t.boolean :approved, default: false

      t.belongs_to :user
      t.belongs_to :gym

      t.datetime :created_at
    end
  end
end
