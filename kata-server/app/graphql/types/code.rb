Types::Code = GraphQL::ObjectType.define do
  name 'Code'
  description 'A code for a token'

  field :consumed, !types.Boolean
  field :code, !types.String
  field :expiry, GraphQL::Types::ISO8601DateTime
end
