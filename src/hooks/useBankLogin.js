import {useState, useEffect, useRef, useCallback} from 'react';
import {Linking} from 'react-native';
import {useIntl} from 'react-intl';
import Config from 'react-native-config';

import useFetch from '@/hooks/useFetch';
import inAppBrowser from '@/utils/inAppBrowser';
import CustomError from '@/utils/customError';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {BIND_BANK_ITEM, GET_USER_ID} from '@/api/data';
import bankSyncServerDataAPITypeEnum from '@/enum/bankSyncServerDataAPIType';
import errorCodeEnum from '@/enum/errorCode';

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
  const intl = useIntl();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [fetchAuthLink, {isError: isFetchAuthLinkError}] = useFetch(
    `${Config.BANKDATA_API_SCHEME}://${Config.BANKDATA_API_ENDPOINT}/getauthlink`,
    {
      initialFetchOptions,
      lazy: true,
    },
  );

  const [fetchAccountDetail, {isError: isFetchAccountDetailError}] = useFetch(
    `${Config.BANKDATA_API_SCHEME}://${Config.BANKDATA_API_ENDPOINT}/getaccountdetail`,
    {
      initialFetchOptions,
      lazy: true,
    },
  );

  const {
    data: getUserIdData,
    loading: getUserIdLoading,
    error: getUserIdError,
  } = useQueryWithAuth(GET_USER_ID);
  const userId = getUserIdData?.userProfile?.id;

  const [bindBankItem] = useMutationWithAuth(BIND_BANK_ITEM, {
    context: {
      // leave error message handling to caller
      errorMessageHandler: {
        defaultErrorMessage: null,
      },
    },
  });

  const _onConnected = useEventCallback(onConnected);

  useEffect(() => {
    let mounted = true;
    /**
     *
     * @param {{url: String}} event
     */
    const handler = async ({url}) => {
      try {
        // url === "plaidlink://event?error_code&error_message&error_type&event_name=OPEN&exit_status&institution_search_query&link_session_id=17496895-716a-4074-82e4-24d2a5a08d2c&mfa_type&request_id&timestamp=2020-08-05T07%3A32%3A57.447Z&view_name=CONSENT"
        const urlObj = new global.URL(url);
        let flow = null;
        if (
          urlObj.protocol.startsWith('plaidlink') &&
          urlObj.hostname === 'connected'
        ) {
          flow = bankSyncServerDataAPITypeEnum.PLAID;
        }

        if (
          urlObj.protocol.startsWith('rewardme') &&
          urlObj.hostname === 'planto'
        ) {
          flow = bankSyncServerDataAPITypeEnum.PLANTO;
        }

        if (
          urlObj.protocol.startsWith('rewardme') &&
          urlObj.hostname === 'credigo'
        ) {
          flow = bankSyncServerDataAPITypeEnum.CREDIGO;
        }

        if (flow) {
          setIsLoading(true);

          let publicToken = '';
          let institutionId = '';
          let accountPayload = [];
          switch (flow) {
            case bankSyncServerDataAPITypeEnum.PLAID:
              publicToken = urlObj.searchParams.get('public_token');
              institutionId = urlObj.searchParams.get('institution_id');
              const accounts = JSON.parse(urlObj.searchParams.get('accounts'));
              if (Array.isArray(accounts)) {
                accountPayload = accounts.map((account) => ({
                  mask: account.meta?.number,
                  name: account.meta?.name,
                }));
              }
              break;
            case bankSyncServerDataAPITypeEnum.PLANTO:
              publicToken = urlObj.searchParams.get('accessToken');
              break;
            case bankSyncServerDataAPITypeEnum.CREDIGO:
              publicToken = urlObj.searchParams.get('public_token');
              break;
          }

          inAppBrowser.close();

          // {
          //   "accountDetails": [...],
          //   "dataAccessToken": "access-sandbox-f87eac80-3ba2-4a28-9671-d294c80fa008",
          //   "itemID": "..."
          // }
          const data = await fetchAccountDetail({
            body: JSON.stringify({
              userId,
              publicToken,
              dataAPIType,
              institutionId,
              accountPayload,
            }),
          });

          if (!mounted) {
            return;
          }

          if (!data.accountDetails?.length) {
            throw new CustomError(errorCodeEnum.DATA_NOT_FOUND);
          }

          await bindBankItem({
            variables: {
              syncServerItemId: data.itemID,
              syncServerItemToken: data.itemToken,
              itemName: data.itemName,
              accounts: data.accountDetails.map((detail) => ({
                syncServerAccountId: detail.accountID,
                accountName: detail.accountName,
                accountType: detail.accountType,
                accountSubtype: detail.accountSubType,
                isValid: detail.isValid,
                mask: detail.mask,
                isSubtypeBySystem: detail.isSubTypeBySystem || false,
              })),
            },
          });

          if (!mounted) {
            return;
          }

          setIsLoading(false);
          _onConnected(data);
        }
      } catch (e) {
        setIsError(true);
        setError(e);
        setIsLoading(false);
      }
    };

    Linking.addEventListener('url', handler);
    return () => {
      mounted = false;
      Linking.removeEventListener('url', handler);
    };
  }, [_onConnected, bindBankItem, dataAPIType, fetchAccountDetail, userId]);

  const login = useCallback(async () => {
    try {
      setIsLoading(true);

      const authLink = await fetchAuthLink({
        body: JSON.stringify({
          dataAPIType,
          countryCode,
          language: intl.locale,
          userId,
        }),
      });

      setIsLoading(false);
      await inAppBrowser.open(authLink);
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
      setError(e);
    }
  }, [countryCode, dataAPIType, fetchAuthLink, intl.locale, userId]);

  const anyLoading = isLoading || getUserIdLoading;

  const anyError =
    isError ||
    isFetchAuthLinkError ||
    isFetchAccountDetailError ||
    !!getUserIdError;

  return [login, {isError: anyError, isLoading: anyLoading, error: error}];
}
