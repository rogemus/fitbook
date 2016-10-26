class AddIndexToMembers < ActiveRecord::Migration[5.0]
  def change
    add_index :members, [:user_id, :gym_id], unique: true
  end
end
