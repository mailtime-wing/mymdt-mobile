import {useLazyQuery} from '@apollo/client';

/**
 * @typedef {import('graphql').DocumentNode} DocumentNode
 * @typedef {import('@apollo/client').LazyQueryHookOptions} LazyQueryHookOptions
 *
 * @param  {DocumentNode} query
 * @param  {LazyQueryHookOptions} options
 *
 */
export default function useLazyQueryWithAuth(query, options = {}) {
  const {context, ..._options} = options;
  const {headers, ..._context} = context || {};

  return useLazyQuery(query, {
    context: {
      auth: true,
      ..._context,
    },
    ..._options,
  });
}
