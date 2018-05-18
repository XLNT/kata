class AddMinterAddressToToken < ActiveRecord::Migration[5.1]
  def change
    add_column :tokens, :minter, :string, null: false
  end
end
