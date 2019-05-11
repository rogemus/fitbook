class ChangeUniqueGymUserOnMember < ActiveRecord::Migration[5.0]
  def change
    remove_index :members, [:user_id, :gym_id]
    add_index :members, [:user_id, :gym_id, :membership_level], unique: true
  end
end
