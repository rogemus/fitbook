class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|

      t.references :owner, references: :user

      t.string :title
      t.string :heading
      t.text :body

      t.integer :votes_count
      t.float :rating

      t.timestamps
    end
  end
end
