class AddLocationToGyms < ActiveRecord::Migration[5.0]
  def change
    add_reference :gyms, :location, foreign_key: true
  end
end
