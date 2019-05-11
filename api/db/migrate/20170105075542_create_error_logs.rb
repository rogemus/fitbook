class CreateErrorLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :error_logs do |t|
      t.string :platform
      t.text :stack
      t.timestamps
    end
  end
end
