import {setContext} from '@apollo/client/link/context';

import {AUTH_TOKENS} from '@/api/auth';

const authLink = setContext((_, previousContext) => {
  if (!previousContext.auth || !previousContext.client) {
    return;
  }

  const {accessToken} = previousContext.client.readQuery({
    query: AUTH_TOKENS,
  });

  const {_headers, ..._previousContext} = previousContext;
  return {
    ..._previousContext,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ..._headers,
    },
  };
});

export default authLink;
