import {onError} from '@apollo/client/link/error';

import globalIntl from '@/intl';
import addToast from '@/apollo/addToast';

const errorLink = onError(
  ({graphQLErrors, networkError, operation, forward}) => {
    const client = operation.client;

    function writeErrorIntoQuery(error) {
      addToast(client, {text: error, variant: 'error'});
    }

    if (graphQLErrors) {
      const errorMessageHandler = operation.getContext().errorMessageHandler;
      graphQLErrors.map(({extensions, message, locations, path}) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
        let errorMessage = globalIntl.get().formatMessage({
          id: 'error.something_went_wrong_please_try_again_later',
        });

        if (errorMessageHandler) {
          if (errorMessageHandler.defaultErrorMessage !== undefined) {
            errorMessage = errorMessageHandler.defaultErrorMessage;
          }
          if (
            extensions?.code &&
            errorMessageHandler.errorMap?.[extensions.code] !== undefined
          ) {
            errorMessage = errorMessageHandler.errorMap[extensions.code];
            if (typeof errorMessage === 'function') {
              errorMessage = errorMessage(extensions);
            }
          }
        }

        if (errorMessage) {
          writeErrorIntoQuery(errorMessage);
        }
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      writeErrorIntoQuery(
        globalIntl.get().formatMessage({
          id: 'error.something_went_wrong_please_try_again_later',
        }),
      );
    }
  },
);

export default errorLink;
