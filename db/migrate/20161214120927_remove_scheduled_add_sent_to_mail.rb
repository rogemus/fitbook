class RemoveScheduledAddSentToMail < ActiveRecord::Migration[5.0]
  def change
    add_column :mails, :sent, :datetime, null: true
    remove_column :mails, :scheduled
  end
end
