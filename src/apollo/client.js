import Config from 'react-native-config';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
// import { concatPagination, relayStylePagination } from "@apollo/client/utilities"
import {AUTH_TOKENS} from '@/api/auth';
import {TOAST_ERRORS, GET_INITIAL_USER_DATA} from '@/api/data';

import RefreshAccessTokenErrorLink from './RefreshAccessTokenErrorLink';
import authLink from './authLink';
import errorLink from './errorLink';

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
  errorLink,
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

const defaultUser = {
  id: 'default-user',
  locale: 'en-US',
  setupStatus: {
    isDataSourceBound: false,
    isProfileCompleted: false,
    isCashbackCurrencyCodeSet: false,
    isMerchantSet: false,
  },
  __typename: 'User',
};

client.writeQuery({
  query: GET_INITIAL_USER_DATA,
  data: {
    userProfile: defaultUser,
  },
});

client.writeQuery({
  query: TOAST_ERRORS,
  data: {
    toastErrors: [],
  },
});

export default client;
