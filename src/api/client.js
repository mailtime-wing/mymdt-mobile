import ApolloClient from 'apollo-boost';
import Config from 'react-native-config';

const client = new ApolloClient({
  uri: `${Config.API_SCHEME}://${Config.API_ENDPOINT}`,
});

export default client;
