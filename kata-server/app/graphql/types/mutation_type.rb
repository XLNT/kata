def get_data(args)
  "yay digital things\n\ni have code: #{args.query}"
end

def bouncer_data(minter, account)
  "0x#{minter.downcase[2..-1]}#{account.downcase[2..-1]}"
end

def tx_bouncer_data(signature)
  signature
end

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :claimToken, Types::TokenClaimSignature do
    description 'Claim a token using a code or campaign name.'
    argument :query, !types.String, 'A query for a token'
    argument :signature, !types.String, 'A signature proving ownership of an address'

    resolve ->(obj, args, ctx) {
      original_message = get_data(args)

      signer = TrustedSigner.recover(
        original_message,
        args.signature
      )

      token = Token.get_info_by_query(args.query)[:token]

      message = bouncer_data(token.minter, signer)
      signature = TrustedSigner.sign(message)

      # deactivate any codes
      code = Code.find_by(code: args.query)
      if code
        code.update!(consumed: true, consumed_at: DateTime.now)
      end

      if token.redeemer_signs
        # if the redeemer signs for this token, prompt them with the signature
        return { sig: signature }.with_indifferent_access
      else
        # otherwise, ask the trusted signer to submit the tx and return the tx_hash
        tx_hash = TrustedSigner.sign_and_send_tx({
          to: token.minter,
          data: '0x'
        })

        return { tx_hash: tx_hash }.with_indifferent_access
      end
    }
  end
end
