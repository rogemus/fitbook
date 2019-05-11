class UniuqeMember < ActiveRecord::Migration[5.0]
  def change
    remove_index :members, [:user_id, :gym_id, :membership_level]
    add_index :members, [:user_id, :gym_id], unique: true
  end
end
