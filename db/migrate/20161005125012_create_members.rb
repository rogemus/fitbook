class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|

      t.belongs_to :user, index: true
      t.belongs_to :gym, index: true

      t.integer :status, :default => 0

      t.timestamps
    end
  end
end
