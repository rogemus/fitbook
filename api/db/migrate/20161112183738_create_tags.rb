class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|

      t.string :name, unique: true

      t.timestamps
    end
  end
end
