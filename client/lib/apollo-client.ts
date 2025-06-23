import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3010/graphql',
})

// 認証ヘッダーを追加するリンク（既存実装）
const authLink = new ApolloLink((operation, forward) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('Token') : null
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Token: token,
    },
  }))
  return forward(operation)
})

// WebSocketリンク（クライアント側のみ）
const wsLink = typeof window !== 'undefined'
  ? new GraphQLWsLink(
      createClient({
        url: process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT || 'ws://localhost:3010/subscriptions',
        connectionParams: () => ({
          Token: localStorage.getItem('Token'),
        }),
      })
    )
  : null

// query/mutation → HTTP、subscription → WebSocket に分岐
const link = typeof window !== 'undefined' && wsLink
  ? split(
      ({ query }) => {
        const def = getMainDefinition(query)
        return def.kind === 'OperationDefinition' && def.operation === 'subscription'
      },
      wsLink,
      authLink.concat(httpLink)
    )
  : authLink.concat(httpLink)

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
