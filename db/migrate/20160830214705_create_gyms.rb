class CreateGyms < ActiveRecord::Migration[5.0]
  def change
    create_table :gyms do |t|
      t.string :name
      t.bigint :facebook_id
      t.string :facebook_token

      t.belongs_to :user

      t.timestamps
    end
  end
end
