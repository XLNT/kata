def get_data(args)
  "yay digital things\n\ni have code: #{args.query}"
end

def add_signature_to_base_data(base_data, signature)
  padded_sig = signature[2..-1].ljust(96 * 2, '0')
  "0x#{base_data[2..-1]}#{padded_sig}"
end

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :claimToken, Types::TokenClaimSignature do
    description 'Claim a token using a code or campaign name.'
    argument :query, !types.String, 'A query for a token'
    argument :signature, !types.String, 'A signature proving ownership of an address'

    resolve ->(obj, args, ctx) {
      original_message = get_data(args)

      redeemer = TrustedSigner.recover(
        original_message,
        args.signature
      )

      token, code = Token.get_info_by_query(args.query).values_at(:token, :code)

      base_data = token.base_msg_data(redeemer)
      data_to_sign = token.bouncer_data_to_sign(base_data)
      signature = TrustedSigner.sign_hash_of(data_to_sign)
      tx_data = add_signature_to_base_data(base_data, signature)

      # deactivate any codes
      if code
        # check expiry
        raise StandardError.new('Code expired!') if code.expired?
        code.update!(consumed: true, consumed_at: DateTime.now)
      end

      if token.redeemer_signs
        # if the redeemer sends the transaction for this token, prompt them with the signature
        return {
          sig: signature,
          # @TODO - just use the data raw instead of building the tx ont he client side
          # data: tx_data
        }.with_indifferent_access
      else
        # otherwise, ask the trusted signer to submit the tx and return the tx_hash
        tx_hash = TrustedSigner.sign_and_send_tx({
          to: token.minter,
          data: tx_data
        })

        return { tx_hash: tx_hash }.with_indifferent_access
      end
    }
  end
end
