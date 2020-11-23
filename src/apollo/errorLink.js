import {TOAST_ERRORS} from '@/api/data';
import {onError} from '@apollo/client/link/error';

import globalIntl from '@/intl';

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
      const errorMessageHandler = operation.getContext().errorMessageHandler;
      graphQLErrors.map(({extensions, message, locations, path}) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
        let errorMessage = globalIntl.get().formatMessage({
          id: 'error.something_went_wrong_please_try_again_later',
        });

        if (errorMessageHandler) {
          if (errorMessageHandler.defaultErrorMessage) {
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
