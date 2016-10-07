class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.bigint :facebook_id, index: true
      t.string :phone
      t.string :name
      t.string :facebook_token
      t.string :email
      t.string :image

      t.timestamps
    end
  end
end
