class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.string :street
      t.float :latitude
      t.float :longitude

      t.belongs_to :city
      t.belongs_to :gym
    end
  end
end
