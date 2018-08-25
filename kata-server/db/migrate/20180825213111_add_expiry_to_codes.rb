class AddExpiryToCodes < ActiveRecord::Migration[5.2]
  def change
    add_column :codes, :expiry, :datetime, null: true, default: nil
  end
end
