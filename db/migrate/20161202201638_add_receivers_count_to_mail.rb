class AddReceiversCountToMail < ActiveRecord::Migration[5.0]
  def change
    remove_column :mails, :receiver_counts
    add_column :mails, :receivers_count, :integer, null: false, default: 0
  end
end
