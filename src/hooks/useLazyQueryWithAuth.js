import {useLazyQuery, useApolloClient} from '@apollo/client';

/**
 * @typedef {import('graphql').DocumentNode} DocumentNode
 * @typedef {import('@apollo/client').LazyQueryHookOptions} LazyQueryHookOptions
 *
 * @param  {DocumentNode} query
 * @param  {QueryHookOptions} options
 *
 */
export default function useLazyQueryWithAuth(query, options = {}) {
  const client = useApolloClient();
  const {context, ..._options} = options;
  const {headers, ..._context} = context || {};

  return useLazyQuery(query, {
    context: {
      client,
      auth: true,
      ..._context,
    },
    ..._options,
  });
}
