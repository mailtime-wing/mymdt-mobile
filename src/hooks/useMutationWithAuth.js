import {useMutation, useApolloClient} from '@apollo/client';

/**
 * @typedef {import('graphql').DocumentNode} DocumentNode
 * @typedef {import('@apollo/client').MutationHookOptions} MutationHookOptions
 *
 * @param  {DocumentNode} mutation
 * @param  {MutationHookOptions} options
 *
 */
export default function useMutationWithAuth(mutation, options = {}) {
  const client = useApolloClient();
  const {context, ..._options} = options;
  const {headers, ..._context} = context || {};

  return useMutation(mutation, {
    context: {
      client,
      auth: true,
      ..._context,
    },
    ..._options,
  });
}
