class Token < ApplicationRecord
  has_many :codes, dependent: :destroy
  has_one :campaign
  serialize :metadata_cache
  serialize :bouncer_abi
  serialize :action_arguments

  REAL_SIG_SIZE = 65
  PADDED_SIG_SIZE = 96

  def metadata
    metadata_cache.with_indifferent_access
  end

  def action_arguments
    super.with_indifferent_access
  end

  def name
    metadata[:name]
  end

  def metadata_cache_text
    metadata_cache.to_json
  end

  def bouncer_abi_text
    bouncer_abi.to_json
  end

  def action_arguments_text
    action_arguments.to_json
  end

  def base_msg_data(beneficiary = '0x0')
    puts "Minter: #{minter}"
    bouncer = Bouncer.new(minter)
    nonce = bouncer.nonce
    puts "Nonce: #{nonce}"

    # construct a function using name === action_method
    fn_abi_item = bouncer_abi.find { |abi_item| abi_item["name"] === action_method }
    raise StandardError.new("No valid ABI Item for method #{action_method}") if not fn_abi_item
    # populate arguments
    args = fn_abi_item["inputs"].map do |i|
      name = i["name"]
      arg_val = action_arguments[name]
      case arg_val
      when "@nonce"
        nonce
      when "@beneficiary"
        beneficiary.downcase
      when "@token"
        address.downcase
      when "@signature"
        # dummy signature
        0.chr * REAL_SIG_SIZE
      else
        arg_val
      end
    end

    fun = Ethereum::Function.new(fn_abi_item)
    encoded_args = Ethereum::Encoder.new.encode_arguments(fun.inputs, args)
    msg_data = "#{fun.signature}#{encoded_args}"

    # @TODO - ethereum.rb doesn't pad bytes correctly, so we actually strip the real count,
    # not the padded amount
    # strip the dummy signature so it can be appended later
    "0x#{msg_data[0...(-1 * 2 * REAL_SIG_SIZE)]}"
  end

  def bouncer_data_to_sign(msg_data)
    # also include the bouncer and the sender (@TODO - remove sender when updated)
    bouncer_address_hex = minter.downcase[2..-1]
    "0x#{bouncer_address_hex}#{bouncer_address_hex}#{msg_data[2..-1]}"
  end

  def self.get_info_by_query(query)
    campaign = Campaign.find_by(code: query)
    if campaign
      return {
        campaign: campaign,
        token: campaign.token,
      }.with_indifferent_access
    end

    code = Code.where({
      code: query,
    }).first

    if code
      return {
        code: code,
        token: code.token,
      }.with_indifferent_access
    end

    nil
  end
end
