class RemovePicutreAddPhoto < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :picture, :string
    remove_column :users, :photo
  end
end
