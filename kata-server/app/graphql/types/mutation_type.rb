Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :claimToken, Types::TokenClaimSignature do
    description 'Claim a token using a code or campaign name.'
    argument :query, !types.String, 'A query for a token'
    argument :signature, !types.String, 'A signature proving ownership of an address'
    argument :currentAccount, !types.String, 'The address that signed the signature'

    resolve ->(obj, args, ctx) {

      # @TODO - recover

      { sig: args.signature }.with_indifferent_access
    }
  end
end
