class AlterUniqueIndexOnComments < ActiveRecord::Migration[5.0]
  def change
    remove_index :comments, [:user_id, :commentable_id]
    add_index :comments, [:user_id, :commentable_id, :commentable_type], unique: true, name: 'uid_cid_ctype_uix'
  end
end
