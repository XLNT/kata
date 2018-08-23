# @TODO - this should be an OR type, not a composite type with optional fields
Types::TokenClaimSignature = GraphQL::ObjectType.define do
  name 'TokenClaimSignature'
  description 'A signature for claiming a token'

  field :sig, types.String, hash_key: :sig
  field :tx_hash, types.String, hash_key: :tx_hash
end
