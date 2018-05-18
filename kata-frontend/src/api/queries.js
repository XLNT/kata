import gql from 'graphql-tag'

export const GET_TOKEN = gql`
  query getToken($query: String!) {
    getToken(query: $query) {
      address
      minter
      metadata {
        name
        description
        image
      }
      campaign {
        open
      }
    }
  }
`

export const CLAIM_TOKEN = gql`
  mutation claimToken(
    $query: String!,
    $currentAccount: String!
    $signature: String!
  ) {
    claimToken(
      query: $query,
      signature: $signature,
      currentAccount: $currentAccount
    ) {
      sig
    }
  }
`
