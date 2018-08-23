Types::TokenInfo = GraphQL::ObjectType.define do
  name 'TokenInfo'
  description 'info about a token'

  field :token, !Types::Token, hash_key: :token
  field :campaign, Types::Campaign, hash_key: :campaign
  field :code, Types::Code, hash_key: :code
end
