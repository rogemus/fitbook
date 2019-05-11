class AddIndexToVotes2 < ActiveRecord::Migration[5.0]
  def change
    remove_index :votes, [:user_id, :voteable_id]
    add_index :votes, [:user_id, :voteable_type, :voteable_id], unique: true
  end
end
