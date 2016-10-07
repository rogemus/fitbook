class CreateGyms < ActiveRecord::Migration[5.0]
  def change
    create_table :gyms do |t|
      t.string :name, index: true
      t.bigint :facebook_id, index: true
      t.string :facebook_token

      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
