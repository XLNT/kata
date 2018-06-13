class TrustedSigner

  include HTTParty
  base_uri ENV.fetch('TRUSTED_SIGNER')
  headers 'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': "Bearer: #{ENV.fetch('TRUSTED_SIGNER_KEY')}",

  def self.recover(message, signature)
    res = self.post('/recover', {
      body: {
        message: message,
        signature: signature
      }.to_json
    })
    raise StandardError.new('NOPE') unless res.success?
    res['account']
  end

  def self.sign(message)
    res = self.post('/signhash', {
      body: {
        message: message
      }.to_json
    })
    raise StandardError.new('NOPE') unless res.success?
    res['signature']
  end
end
