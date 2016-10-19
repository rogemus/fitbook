class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|

      t.string :name
      t.string :phone
      t.string :email, unique: true
      t.string :fb_image

      t.bigint :facebook_id, index: true, unique: true

      t.string :graph_token

      t.timestamps
    end
  end
end
