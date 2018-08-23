Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :getToken do
    type Types::TokenInfo
    description 'Get token info'
    argument :query, types.String
    resolve ->(obj, args, ctx) {

      res = Token.get_info_by_query(args.query)
      return res if res

      GraphQL::ExecutionError.new("Query '#{args['query']}' has no campaigns or codes.")
    }
  end
end
