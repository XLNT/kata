Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :getToken do
    type Types::MintableToken
    description 'Get token info'
    argument :query, types.String
    resolve ->(obj, args, ctx) {

      campaign = Campaign.find_by(code: args['query'])
      if campaign
        return campaign.token
      end

      code = Code.find_by(code: args['query'])
      if code
        return code.token
      end

      GraphQL::ExecutionError.new("Query '#{args['query']}' has no campaigns or codes.")
    }
  end
end
