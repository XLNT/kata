class AtP
  include HTTParty
  base_uri ENV.fetch('AT_P')
  headers {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': "Bearer: #{ENV.fetch('AT_P_KEY')}"
  }

  def self.toPlanet(ids = [])
    res = self.post('/to/planet', {
      body: {
        ids: ids,
      }.to_json
    })
    raise StandardError.new('NOPE') unless res.success?
    res['ids']
  end
end
