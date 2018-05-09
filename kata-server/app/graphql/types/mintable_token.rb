Types::MintableToken = GraphQL::ObjectType.define do
  name 'MintableToken'
  description 'A token that can be minted.'

  field :address, !types.String
  field :metadata, !Types::Metadata
end
