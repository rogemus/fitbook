class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|

      t.integer :membership_level, default: :regular
      t.boolean :approved, default: false

      t.belongs_to :user, index: true
      t.belongs_to :gym, index: true

      t.datetime :created_at

      t.index [:user, :gym], unique: true
    end
  end
end
