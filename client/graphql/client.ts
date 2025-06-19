import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client';

const Token = typeof window !== 'undefined' ? localStorage.getItem('Token') : null;
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: Record<string, string> }) => ({
    headers: {
      Token,
      ...headers,
    },
  }));

  return forward(operation);
});
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3010/graphql',
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});