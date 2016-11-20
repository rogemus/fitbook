class PostsTags < ActiveRecord::Migration[5.0]
  def change
    create_join_table :posts, :tags do |t|
      t.index [:post_id, :tag_id], unique: true
    end

    add_foreign_key :posts_tags, :posts
    add_foreign_key :posts_tags, :tags
  end
end
