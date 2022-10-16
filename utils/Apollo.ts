import { ApolloClient, InMemoryCache } from '@apollo/client'
import 'dotenv/config'

const client = new ApolloClient({
  uri: process.env.SERVER_HOST || 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

export default client
