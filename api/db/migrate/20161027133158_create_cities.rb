class CreateCities < ActiveRecord::Migration[5.0]
  def change
    create_table :cities do |t|
      t.string :name, unique: true

      t.belongs_to :country
    end
  end
end
