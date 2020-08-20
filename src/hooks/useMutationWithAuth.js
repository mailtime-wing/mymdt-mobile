import {useContext} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {AuthContext} from '@/context/auth';

/**
 * @typedef {import('graphql').DocumentNode} DocumentNode
 * @typedef {import('@apollo/react-hooks').MutationHookOptions} MutationHookOptions
 *
 * @param  {DocumentNode} mutation
 * @param  {MutationHookOptions} options
 *
 */
export default function useMutationWithAuth(mutation, options = {}) {
  const {authToken} = useContext(AuthContext);
  const {context, ..._options} = options;
  const {headers, ..._context} = context || {};

  return useMutation(mutation, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
        ...headers,
      },
      ..._context,
    },
    ..._options,
  });
}
