class CreateMintableTokens < ActiveRecord::Migration[5.1]
  def change
    create_table :mintable_tokens do |t|
      t.string :address, null: false
      t.jsonb :metadata_cache, null: false, default: '{}'
      t.timestamps
    end
  end
end
