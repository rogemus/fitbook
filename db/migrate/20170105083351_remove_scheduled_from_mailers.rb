class RemoveScheduledFromMailers < ActiveRecord::Migration[5.0]
  def change
    remove_column :mailers, :scheduled
    add_column :mailers, :send, :datetime, default: nil
  end
end
