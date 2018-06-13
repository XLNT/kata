class AtP
  include HTTParty
  base_uri ENV.fetch('AT_P')

  def self.toPlanet(ids = [])
    res = self.post('/to/planet', {
      body: {
        ids: ids,
      }.to_json,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    raise StandardError.new('NOPE') unless res.success?
    res['ids']
  end
end
