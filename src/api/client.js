import Config from 'react-native-config';
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
// import { concatPagination, relayStylePagination } from "@apollo/client/utilities"

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
  link: new HttpLink({
    uri: `${Config.API_SCHEME}://${Config.API_ENDPOINT}`,
  }),
});

export default client;
