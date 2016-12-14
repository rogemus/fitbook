class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.references :user, User: true,
                   index: true, foreign_key: true, null: false
      t.references :commentable, polymorphic: true,
                   index: true, null: false
      t.string :body, null: false

      t.timestamps
    end
  end
end
