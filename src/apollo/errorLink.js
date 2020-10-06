import {TOAST_ERRORS} from '@/api/data';
import {onError} from '@apollo/client/link/error';

const errorLink = onError(
  ({graphQLErrors, networkError, operation, forward}) => {
    const client = operation.client;
    const {toastErrors} = client.readQuery({
      query: TOAST_ERRORS,
    });

    function writeErrorIntoQuery(error) {
      if (toastErrors.every((_error) => _error.text !== error)) {
        client.writeQuery({
          query: TOAST_ERRORS,
          data: {
            toastErrors: [...toastErrors, {text: error, variant: 'error'}],
          },
        });
      }
    }

    if (graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
        writeErrorIntoQuery(message.toString());
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      writeErrorIntoQuery(networkError.toString());
    }

    return forward(operation);
  },
);

export default errorLink;
