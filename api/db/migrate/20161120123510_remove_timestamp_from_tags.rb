class RemoveTimestampFromTags < ActiveRecord::Migration[5.0]
  def change
    remove_column :tags, :created_at, :string
    remove_column :tags, :updated_at, :string
  end
end
