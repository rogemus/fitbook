class RemoveFbImageAddCoverPhoto < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :cover, :string
    add_column :users, :photo, :string
    remove_column :users, :fb_image
  end
end
