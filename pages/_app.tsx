import '../styles/global.css'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../utils/Apollo'

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
