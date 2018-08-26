class AddBouncerAbiToToken < ActiveRecord::Migration[5.2]
  def change
    add_column :tokens, :bouncer_abi, :jsonb, null: false, default: []
    add_column :tokens, :action_method, :string, null: false, default: 'mint'
    add_column :tokens, :action_arguments, :jsonb, null:false, default: {}
  end
end
