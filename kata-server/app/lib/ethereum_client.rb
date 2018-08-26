class EthereumClient
  include Singleton

  def client
    @client ||= Ethereum::HttpClient.new(ENV.fetch('NODE_ENDPOINT'))
  end
end
