class ChangeRatingTypeOnVote < ActiveRecord::Migration[5.0]
  def change
    change_column :votes, :rating, :float, default: 0.0
  end
end
