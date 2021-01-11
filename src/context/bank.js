import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
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

const bankContextInitialValue = {
  setup: (_dataAPIType, _countryCode) => () => {},
  login: async () => {},
  isLoading: false,
  isLoadingAccountDetails: false,
  isError: false,
  error: null,
};

const initialState = {
  dataAPIType: '',
  countryCode: '',
  isLoading: false,
  isLoadingAccountDetails: false,
  isError: false,
  error: null,
};

const SETUP = 'setup';
const SET_IS_LOADING = 'setIsLoading';
const SET_IS_LOADING_ACCOINT_DETAILS = 'setIsLoadingAccountDetails';
const SET_ERROR = 'setError';

/**
 *
 * @param {typeof initialState} state
 * @param {*} action
 *
 * @returns {typeof initialState}
 */
function reducer(state, action) {
  switch (action.type) {
    case SETUP: {
      return {
        ...initialState,
        dataAPIType: action.payload.dataAPIType,
        countryCode: action.payload.countryCode,
      };
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_IS_LOADING_ACCOINT_DETAILS: {
      return {
        ...state,
        isLoadingAccountDetails: action.payload,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        isError: true,
        error: action.payload,
      };
    }
    default:
      throw new Error();
  }
}

export const BankContext = createContext(bankContextInitialValue);

export const BankProvider = ({children}) => {
  const intl = useIntl();
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const {dataAPIType, countryCode} = state;
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
          dispatch({
            type: SET_IS_LOADING,
            payload: true,
          });

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

          dispatch({
            type: SET_IS_LOADING_ACCOINT_DETAILS,
            payload: true,
          });

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

          dispatch({
            type: SET_IS_LOADING_ACCOINT_DETAILS,
            payload: false,
          });

          dispatch({
            type: SET_IS_LOADING,
            payload: false,
          });
        }
      } catch (e) {
        dispatch({
          type: SET_ERROR,
          payload: e,
        });
        dispatch({
          type: SET_IS_LOADING_ACCOINT_DETAILS,
          payload: false,
        });
        dispatch({
          type: SET_IS_LOADING,
          payload: false,
        });
      }
    };

    Linking.addEventListener('url', handler);
    return () => {
      mounted = false;
      Linking.removeEventListener('url', handler);
    };
  }, [bindBankItem, fetchAccountDetail, userId, dataAPIType]);

  const setup = useCallback((_dataAPIType, _countryCode) => {
    dispatch({
      type: SETUP,
      payload: {
        dataAPIType: _dataAPIType,
        countryCode: _countryCode,
      },
    });

    return () => {
      dispatch({
        type: SETUP,
        payload: {
          dataAPIType: '',
          countryCode: '',
        },
      });
    };
  }, []);

  const login = useCallback(async () => {
    if (!dataAPIType || !dataAPIType) {
      return;
    }

    try {
      dispatch({
        type: SET_IS_LOADING,
        payload: true,
      });

      const authLink = await fetchAuthLink({
        body: JSON.stringify({
          dataAPIType,
          countryCode,
          language: intl.locale,
          userId,
        }),
      });

      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      await inAppBrowser.open(authLink);
    } catch (e) {
      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
      dispatch({
        type: SET_ERROR,
        payload: e,
      });
    }
  }, [countryCode, dataAPIType, fetchAuthLink, intl.locale, userId]);

  const anyLoading = state.isLoading || getUserIdLoading;

  const anyError =
    state.isError ||
    isFetchAuthLinkError ||
    isFetchAccountDetailError ||
    !!getUserIdError;

  const bankContext = useMemo(
    () => ({
      setup,
      login,
      isLoading: anyLoading,
      isLoadingAccountDetails: state.isLoadingAccountDetails,
      isError: anyError,
      error: state.error,
    }),
    [
      setup,
      login,
      anyLoading,
      state.isLoadingAccountDetails,
      anyError,
      state.error,
    ],
  );

  return (
    <BankContext.Provider value={bankContext}>{children}</BankContext.Provider>
  );
};

export default BankProvider;
