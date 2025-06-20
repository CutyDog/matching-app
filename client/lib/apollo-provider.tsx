'use client';

import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: Record<string, string> }) => ({
    headers: {
      Token: typeof window !== 'undefined' ? localStorage.getItem('Token') : null,
      ...headers,
    },
  }));

  return forward(operation);
});
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3010/graphql',
});
const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}