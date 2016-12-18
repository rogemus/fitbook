class AlterUniqueIndexOnComments2 < ActiveRecord::Migration[5.0]
  def change
    remove_index :comments, [:user_id, :commentable_id, :commentable_type]
  end
end
