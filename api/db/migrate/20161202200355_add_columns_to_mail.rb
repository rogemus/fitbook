class AddColumnsToMail < ActiveRecord::Migration[5.0]
  def change
    change_table :mails do |t|

      t.remove :receivers

      t.integer :receiver_counts, null: false, default: 0

      t.string :header

    end
  end
end
