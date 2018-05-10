Types::Token = GraphQL::ObjectType.define do
  name 'Token'
  description 'A token that can be minted.'

  field :address, !types.String
  field :metadata, !Types::Metadata
  field :campaign, Types::Campaign
end
