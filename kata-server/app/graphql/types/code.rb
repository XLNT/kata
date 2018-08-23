Types::Code = GraphQL::ObjectType.define do
  name 'Code'
  description 'A code for a token'

  field :consumed, !types.Boolean
  field :code, !types.String
end
