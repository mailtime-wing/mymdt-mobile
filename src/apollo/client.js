import Config from 'react-native-config';
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
// import { concatPagination, relayStylePagination } from "@apollo/client/utilities"
import {AUTH_TOKENS} from '@/api/auth';

import RefreshAccessTokenErrorLink from './RefreshAccessTokenErrorLink';
import authLink from './authLink';

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      TransactionConnection: {
        fields: {
          edges: {
            // merge(existing, incoming, { mergeObjects }) {
            //   return mergeObjects(existing, incoming);
            // },
            merge: true,
          },
        },
      },
    },
  }),
  link: new RefreshAccessTokenErrorLink().concat(
    authLink.concat(
      new HttpLink({
        uri: `${Config.API_SCHEME}://${Config.API_ENDPOINT}`,
      }),
    ),
  ),
});

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
