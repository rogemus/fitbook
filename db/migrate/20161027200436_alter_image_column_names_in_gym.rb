class AlterImageColumnNamesInGym < ActiveRecord::Migration[5.0]
  def change
    add_column :gyms, :cover, :string
    remove_column :gyms, :fb_image
  end
end
