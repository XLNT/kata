Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :getToken do
    type Types::Token
    description 'Get token info'
    argument :query, types.String
    resolve ->(obj, args, ctx) {

      token = Token.find_by_query(args.query)
      return token if token

      GraphQL::ExecutionError.new("Query '#{args['query']}' has no campaigns or codes.")
    }
  end
end
