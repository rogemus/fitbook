class AddFacebookDataToGyms < ActiveRecord::Migration[5.0]
  def change
    add_column :gyms, :about, :string
    add_column :gyms, :description, :string
    add_column :gyms, :website, :string
    add_column :gyms, :picture, :string
  end
end
