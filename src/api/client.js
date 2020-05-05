import Config from 'react-native-config';
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${Config.API_SCHEME}://${Config.API_ENDPOINT}`,
  }),
});

export default client;
