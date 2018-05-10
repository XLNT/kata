Types::Campaign = GraphQL::ObjectType.define do
  name 'Campaign'
  description 'A campaign for a token'

  field :open, !types.Boolean
  field :name, !types.String
  field :why, !types.String
end
