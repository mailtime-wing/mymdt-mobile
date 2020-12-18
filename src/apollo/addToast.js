import {gql} from '@apollo/client';

let toastId = 0;

/**
 *
 * @param {import("@apollo/client").ApolloClient} client
 * @param {*} toastObj
 */
function addToast(client, toastObj) {
  client.cache.modify({
    fields: {
      toastErrors(existingToastErrorRefs = [], {readField}) {
        // avoid toasting same error message
        if (
          existingToastErrorRefs.some(
            (ref) => readField('text', ref) === toastObj.text,
          )
        ) {
          return existingToastErrorRefs;
        }

        const newToastErrorRef = client.cache.writeFragment({
          data: {
            __typename: 'ToastError',
            id: toastId++,
            ...toastObj,
          },
          fragment: gql`
            fragment NewToastError on ToastError {
              id
              text
              variant
            }
          `,
        });

        return [...existingToastErrorRefs, newToastErrorRef];
      },
    },
  });
}

export default addToast;
