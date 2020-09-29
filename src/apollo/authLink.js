import {setContext} from '@apollo/client/link/context';

import {AUTH_TOKENS} from '@/api/auth';

const authLink = setContext((operation, previousContext) => {
  if (!previousContext.auth) {
    return;
  }

  const {accessToken} = operation.client.readQuery({
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
