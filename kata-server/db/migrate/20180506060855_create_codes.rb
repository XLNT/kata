class CreateCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :codes do |t|
      t.string :code, null: false
      t.references :token, null: false
      t.boolean :consumed, default: false, null: false
      t.date :consumed_at, default: nil

      t.timestamps
    end

    add_index :codes, :code, unique: true
    add_index :codes, :consumed
  end
end
