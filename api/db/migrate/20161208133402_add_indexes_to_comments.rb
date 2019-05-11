class AddIndexesToComments < ActiveRecord::Migration[5.0]
  def change
    add_index :comments, [:user_id, :commentable_id], unique: true
    add_index :comments, :created_at
  end
end
