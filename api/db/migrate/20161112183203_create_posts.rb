class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|

      t.references :author, references: :user, null: false, index: true

      t.string :title, null: false, limit: 55
      t.string :heading, null: false
      t.text :body, null: false

      t.integer :votes_count, default: 0
      t.float :rating, default: 0.0

      t.timestamps
    end
  end
end
