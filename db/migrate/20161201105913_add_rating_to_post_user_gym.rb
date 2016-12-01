class AddRatingToPostUserGym < ActiveRecord::Migration[5.0]
  def change
    [:users, :gyms].each do |table|
      add_column table, :votes_count, :integer, default: 0
      add_column table, :rating, :float, default: 0.0
    end
  end
end
