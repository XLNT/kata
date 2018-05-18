class TrustedSigner

  include HTTParty
  base_uri ENV.fetch('TRUSTED_SIGNER')

  def self.recover(message, signature)
    res = self.post('/recover', {
      body: {
        message: message,
        signature: signature
      },
    })
    raise StandardError.new('NOPE') unless res.success?
    res['account']
  end

  def self.sign(message)
    res = self.post('/sign', {
      body: {
        message: message
      }
    })
    raise StandardError.new('NOPE') unless res.success?
    res['signature']
  end
end
