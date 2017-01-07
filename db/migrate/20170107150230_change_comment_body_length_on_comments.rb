class ChangeCommentBodyLengthOnComments < ActiveRecord::Migration[5.0]
  def change
    change_column :comments, :body, :string, limit: 500
  end
end
