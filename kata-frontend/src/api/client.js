import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://10.2.252.17:3000/graphql',
})

export default client
