class AddKeyToCodes < ActiveRecord::Migration[5.1]
  def change
    add_column :codes, :key, :integer, limit: 8, null: false
  end
end
