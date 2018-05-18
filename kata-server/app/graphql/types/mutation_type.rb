def get_data(args)
  "yay digital things\n\ni have code: #{args.query}\n\nand this is me: #{args.currentAccount}"
end

def bouncer_data(minter, currentAccount)
  "0x#{minter.downcase[2..-1]}#{currentAccount.downcase[2..-1]}"
end

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :claimToken, Types::TokenClaimSignature do
    description 'Claim a token using a code or campaign name.'
    argument :query, !types.String, 'A query for a token'
    argument :signature, !types.String, 'A signature proving ownership of an address'
    argument :currentAccount, !types.String, 'The address that signed the signature'

    resolve ->(obj, args, ctx) {
      original_message = get_data(args)

      signer = TrustedSigner.recover(
        original_message,
        args.signature
      )

      raise StandardError.new('NOPE') unless signer.downcase == args.currentAccount.downcase

      token = Token.find_by_query(args.query)

      message = bouncer_data(token.minter, args.currentAccount)
      signature = TrustedSigner.sign(message)

      # deactivate any codes
      code = Code.find_by(code: args.query)
      if code
        code.update!(consumed: true)
      end

      { sig: signature }.with_indifferent_access
    }
  end
end
