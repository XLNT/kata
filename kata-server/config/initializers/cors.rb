
# https://github.com/cyu/rack-cors
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins Rails.env.development? ? '*' : 'claim.xlnt.co'
    resource '*', :headers => :any, :methods => [
      :get,
      :post,
      :put,
      :delete,
      :options,
      :head
    ]
  end
end
