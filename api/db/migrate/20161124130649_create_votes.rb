class CreateVotes < ActiveRecord::Migration[5.0]
  def change
    create_table :votes do |t|
      t.references :user, User: true,
                   index: true, foreign_key: true, null: false
      t.references :voteable, polymorphic: true,
                   index: true, null: false
      t.integer :rating, null: false
    end
  end
end
