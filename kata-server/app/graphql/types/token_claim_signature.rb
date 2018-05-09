Types::TokenClaimSignature = GraphQL::ObjectType.define do
  name 'TokenClaimSignature'
  description 'A signature for claiming a token'

  field :sig, !types.String, hash_key: :sig
end
