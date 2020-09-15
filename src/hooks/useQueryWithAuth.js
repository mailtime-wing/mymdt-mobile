import {useContext} from 'react';
import {useQuery, useApolloClient} from '@apollo/client';

import {AuthContext} from '@/context/auth';

/**
 * @typedef {import('graphql').DocumentNode} DocumentNode
 * @typedef {import('@apollo/client').QueryHookOptions} QueryHookOptions
 *
 * @param  {DocumentNode} query
 * @param  {QueryHookOptions} options
 *
 */
export default function useQueryWithAuth(query, options = {}) {
  const {authToken} = useContext(AuthContext);
  const client = useApolloClient();
  const {context, ..._options} = options;
  const {headers, ..._context} = context || {};

  return useQuery(query, {
    context: {
      client,
      auth: true,
      ..._context,
    },
    skip: !authToken,
    ..._options,
  });
}
