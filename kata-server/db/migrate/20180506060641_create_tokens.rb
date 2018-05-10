class CreateTokens < ActiveRecord::Migration[5.1]
  def change
    create_table :tokens do |t|
      t.string :address, null: false
      t.jsonb :metadata_cache, null: false, default: '{}'
      t.timestamps
    end
  end
end
