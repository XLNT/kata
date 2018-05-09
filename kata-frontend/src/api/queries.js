import gql from 'graphql-tag'

export const GET_TOKEN = gql`
  query getToken($code: String!) {
    getToken(query: $code) {
      address
      metadata {
        name
        description
        image
      }
    }
  }
`

export const CLAIM_TOKEN = gql`
  mutation claimToken(
    $query: String!,
    $signature: String!,
    $data: String!
  ) {
    claimToken(
      query: $query,
      signature: $signature,
      data: $data
    ) {
      sig
    }
  }
`
