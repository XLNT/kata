import gql from 'graphql-tag'

export const GET_TOKEN = gql`
  query getToken($query: String!) {
    getToken(query: $query) {
      token {
        address
        minter
        redeemer_signs
        metadata {
          name
          description
          image
        }
      }
      campaign {
        open
      }
      code {
        consumed
        expiry
      }
    }
  }
`

export const CLAIM_TOKEN = gql`
  mutation claimToken(
    $query: String!,
    $signature: String!
  ) {
    claimToken(
      query: $query,
      signature: $signature,
    ) {
      sig
      tx_hash
    }
  }
`
