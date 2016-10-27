class AddIndexToCities < ActiveRecord::Migration[5.0]
  def change
    add_index :cities, [:name, :country_id], unique: true
  end
end
