import {useContext} from 'react';
import {useQuery} from '@apollo/client';

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
  const {isLoggedIn} = useContext(AuthContext);
  const {context, skip, ..._options} = options;
  const {headers, ..._context} = context || {};

  return useQuery(query, {
    context: {
      auth: true,
      ..._context,
    },
    skip: !isLoggedIn || (skip !== undefined && skip),
    ..._options,
  });
}
