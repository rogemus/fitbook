class AddIndexToVotes < ActiveRecord::Migration[5.0]
  def change
    add_index :votes, [:user_id, :voteable_id], unique: true
  end
end
