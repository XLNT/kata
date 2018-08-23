class AddRedeemerSignsToToken < ActiveRecord::Migration[5.2]
  def change
    add_column :tokens, :redeemer_signs, :boolean, default: true
  end
end
