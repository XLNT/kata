class Bouncer

  NONCE_ABI = {
    "constant": true,
    "inputs": [],
    "name": "nonce",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }

  def initialize(address = '0x0')
    @address = address
  end

  def nonce
    client = EthereumClient.instance.client
    client.default_account = '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'
    # ^ why the fuck does this line need to exist??
    contract = Ethereum::Contract.create(client: client, name: 'WhyDoesThisPolluteMyFuckingGlobalNamespace', code: nil, address: @address, abi: [NONCE_ABI].to_json)
    nonce = contract.call.nonce
    nonce + 1
  end

end
