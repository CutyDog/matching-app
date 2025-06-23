import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client'
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { createConsumer } from '@rails/actioncable'
import { DocumentNode } from 'graphql'
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink"
import { getMainDefinition } from '@apollo/client/utilities'

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3010/graphql'
const wsEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT || 'ws://localhost:3010/subscriptions'
const Token = typeof window !== 'undefined' ? localStorage.getItem('Token') : null

const hasSubscriptionOperation = ({ query }: { query: DocumentNode }) => {
  const def = getMainDefinition(query)
  return def.kind === 'OperationDefinition' && def.operation === 'subscription'
};

// 認証ヘッダーを追加するリンク（既存実装）
const httpLink = new HttpLink({ uri: graphqlEndpoint })
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Token,
    },
  }))
  return forward(operation)
})
const authenticatedHttpLink = ApolloLink.from([authLink, httpLink]);

// WebSocketリンク（クライアント側のみ）
const actionCableConsumer = createConsumer(`${wsEndpoint}?Token=${Token}`)
const actionCableLink = new ActionCableLink({ cable: actionCableConsumer });

// query/mutation → HTTP、subscription → WebSocket に分岐
const link = split(
  hasSubscriptionOperation,
  actionCableLink,
  authenticatedHttpLink
)

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})