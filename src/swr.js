import React, {useRef, useEffect, useCallback, useMemo} from 'react';
import {SWRConfig} from 'swr';
import {useApolloClient} from '@apollo/client';

import {AUTH_TOKENS} from '@/api/auth';

export default function GlobalSWRConfig({children}) {
  const client = useApolloClient();
  const clientRef = useRef(client);
  useEffect(() => {
    clientRef.current = client;
  }, [client]);

  const fetcher = useCallback(async (url, injectedClient) => {
    const _client = injectedClient || clientRef.current;
    const {accessToken} = _client.readQuery({
      query: AUTH_TOKENS,
    });

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      // TODO: handle error, e.g. prompt toast
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }

    return res.json();
  }, []);

  const swrConfig = useMemo(
    () => ({
      fetcher,
    }),
    [fetcher],
  );

  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
