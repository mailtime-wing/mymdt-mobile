import {useState, useEffect, useRef, useCallback} from 'react';
import {Linking} from 'react-native';

import useFetch from '@/hooks/useFetch';
import inAppBrowser from '@/utils/inAppBrowser';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {BIND_BANK_ITEM} from '@/api/data';

const initialFetchOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

function useEventCallback(fn, dependencies = []) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...dependencies]);

  return useCallback(
    (...args) => {
      const refFn = ref.current;
      if (typeof refFn === 'function') {
        return refFn(...args);
      }
    },
    [ref],
  );
}

export default function useBankLogin(
  dataAPIType,
  countryCode,
  {onConnected} = {},
) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fetchLinkToken, {isError: isFetchLinkTokenError}] = useFetch(
    'https://bankwebhook-alpha.reward.me/getlinktoken',
    {
      initialFetchOptions,
      lazy: true,
    },
  );

  const [fetchAccountDetail, {isError: isFetchAccountDetailError}] = useFetch(
    'https://bankwebhook-alpha.reward.me/getaccountdetail',
    {
      initialFetchOptions,
      lazy: true,
    },
  );

  const [bindBankItem] = useMutationWithAuth(BIND_BANK_ITEM);

  const _onConnected = useEventCallback(onConnected);

  useEffect(() => {
    /**
     *
     * @param {{url: String}} event
     */
    const handler = async ({url}) => {
      try {
        // url === "plaidlink://event?error_code&error_message&error_type&event_name=OPEN&exit_status&institution_search_query&link_session_id=17496895-716a-4074-82e4-24d2a5a08d2c&mfa_type&request_id&timestamp=2020-08-05T07%3A32%3A57.447Z&view_name=CONSENT"
        const urlObj = new global.URL(url);
        if (urlObj.protocol.startsWith('plaidlink')) {
          switch (urlObj.hostname) {
            case 'connected': {
              const publicToken = urlObj.searchParams.get('public_token');

              inAppBrowser.close();

              // {
              //   "accountDetails": [...],
              //   "dataAccessToken": "access-sandbox-f87eac80-3ba2-4a28-9671-d294c80fa008",
              //   "itemID": "..."
              // }
              const data = await fetchAccountDetail({
                body: JSON.stringify({
                  publicToken,
                  dataAPIType,
                }),
              });

              await bindBankItem({
                variables: {
                  syncServerItemId: data.itemID,
                  syncServerItemToken: data.itemToken,
                  itemName: data.itemName,
                  accounts: data.accountDetails.map(detail => ({
                    syncServerAccountId: detail.accountID,
                    accountName: detail.accountName,
                    accountType: detail.accountType,
                    accountSubtype: detail.accountSubType,
                    isValid: detail.isValid,
                    mask: detail.mask,
                  })),
                },
              });

              _onConnected(data);
              break;
            }
            case 'exit': {
              break;
            }
            case 'event': {
              break;
            }
          }
        }
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    Linking.addEventListener('url', handler);
    return () => {
      Linking.removeEventListener('url', handler);
    };
  }, [_onConnected, bindBankItem, dataAPIType, fetchAccountDetail]);

  const login = useCallback(async () => {
    try {
      setIsLoading(true);

      // TODO: get user ID from API
      const linkToken = await fetchLinkToken({
        body: JSON.stringify({
          dataAPIType,
          countryCode,
          userID: '111111111',
        }),
      });

      await inAppBrowser.open(
        `https://cdn.plaid.com/link/v2/stable/link.html?isWebview=true&token=${linkToken}`,
      );
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [countryCode, dataAPIType, fetchLinkToken]);

  const anyError =
    isError || isFetchLinkTokenError || isFetchAccountDetailError;

  return [login, {isError: anyError, isLoading}];
}
