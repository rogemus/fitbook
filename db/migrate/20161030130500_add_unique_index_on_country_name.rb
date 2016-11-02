class AddUniqueIndexOnCountryName < ActiveRecord::Migration[5.0]
  def change
    add_index :countries, :name, :unique => true
  end
end
