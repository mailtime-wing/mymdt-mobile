import Config from 'react-native-config';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
// import { concatPagination, relayStylePagination } from "@apollo/client/utilities"
import {AUTH_TOKENS} from '@/api/auth';

import RefreshAccessTokenErrorLink from './RefreshAccessTokenErrorLink';
import authLink from './authLink';

const client = new ApolloClient({
  cache: new InMemoryCache(),
});

const link = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    operation.client = operation.getContext().client || client;
    return forward(operation);
  }),
  new RefreshAccessTokenErrorLink(),
  authLink,
  new HttpLink({
    uri: `${Config.API_SCHEME}://${Config.API_ENDPOINT}`,
  }),
]);
client.setLink(link);

// initalize client state
client.writeQuery({
  query: AUTH_TOKENS,
  data: {
    tokensInitialized: false,
    accessToken: '',
    refreshToken: '',
    isRefreshTokenExpired: false,
  },
});

export default client;
