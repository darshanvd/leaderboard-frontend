import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP,
  credentials: 'include'
});

const wsLink = new GraphQLWsLink(createClient({
  url: import.meta.env.VITE_GRAPHQL_WS,
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Player: {
        keyFields: ["playerId"],
      },
    },
  }),
});

export default client;