class BeingTrainerFlag < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :is_trainer, :boolean, default: false
  end
end
