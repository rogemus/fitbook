class CreateGyms < ActiveRecord::Migration[5.0]
  def change
    create_table :gyms do |t|

      t.string :name
      t.string :fb_image

      t.bigint :facebook_id, index: true

      t.string :graph_token

      t.references :owner, references: :user

      t.timestamps
    end
  end
end
