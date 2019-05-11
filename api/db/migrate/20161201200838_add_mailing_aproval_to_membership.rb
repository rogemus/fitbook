class AddMailingAprovalToMembership < ActiveRecord::Migration[5.0]
  def change
    add_column :members, :mailing, :boolean, default: false, null: false
  end
end
