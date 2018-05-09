class CreateCampaigns < ActiveRecord::Migration[5.1]
  def change
    create_table :campaigns do |t|
      t.boolean :open, default: true
      t.string :code, null: false
      t.references :token
      t.timestamps
    end
  end
end
