import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useApolloClient, useQuery} from '@apollo/client';
import jwt_decode from 'jwt-decode';
import {AUTH_TOKENS, REFRESH_TOKEN_API} from '@/api/auth';
import {GET_INITIAL_USER_DATA} from '@/api/data';
import {useMutation} from '@apollo/client';

import PopupModal from '@/components/PopupModal';
import {MEASURABLE_REWARD_POINT} from '@/constants/currency';

export const AuthContext = createContext({
  initialized: false,
  isLoggedIn: false,
  updateCashBackType: () => {},
  signIn: () => {},
  signOut: () => {},
  cashBackType: '',
});

const UPDATE_CASH_BACK_TYPE = 'updateCashBackType';

const initialState = {
  cashBackType: MEASURABLE_REWARD_POINT, // discuss before to set reward point as default cash back type
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CASH_BACK_TYPE: {
      return {
        ...state,
        cashBackType: action.payload,
      };
    }
    default:
      throw new Error();
  }
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const client = useApolloClient();
  const {data: authData = {}} = useQuery(AUTH_TOKENS);
  const [refreshTokenRequest] = useMutation(REFRESH_TOKEN_API);

  // clear token cache
  const signOut = useCallback(async () => {
    // TODO: Most auth-required rendering and fetching depends on whether has logged in, which is determined by
    // the existence of accessToken. Before resetStore, we manually clear this state to make those rendering
    // and fetching stale so that we can avoid bug. Need to re-visit to check if we can skip it.
    await client.writeQuery({
      query: AUTH_TOKENS,
      data: {
        tokensInitialized: true,
        accessToken: '',
        refreshToken: '',
        isRefreshTokenExpired: false,
      },
    });
    await client.resetStore();
  }, [client]);

  // set token cache and fetch initially-required data
  const signIn = useCallback(
    async (accessToken, refreshToken) => {
      try {
        client.writeQuery({
          query: AUTH_TOKENS,
          data: {
            accessToken,
            refreshToken,
          },
        });

        await client.query({
          query: GET_INITIAL_USER_DATA,
          context: {
            auth: true,
          },
          fetchPolicy: 'network-only',
        });
      } catch {
        // TODO: can we do better?
        signOut();
      }
    },
    [client, signOut],
  );

  // Initialize tokens from AsyncStorage. If token is expired, try to refresh it
  useEffect(() => {
    const getToken = async () => {
      let authToken = '';
      let refreshToken = '';
      try {
        authToken = await AsyncStorage.getItem('authToken');
        refreshToken = await AsyncStorage.getItem('refreshToken');
        if (authToken) {
          const {exp} = jwt_decode(authToken);
          let currentTime = new Date().getTime() / 1000;
          if (currentTime > exp) {
            try {
              const {data} = await refreshTokenRequest({
                variables: {
                  refreshToken: refreshToken,
                },
              });
              authToken = data.refreshAccessToken;
            } catch (e) {
              authToken = '';
              refreshToken = '';
            }
          }
        }

        if (!authToken || !refreshToken) {
          await signOut();
        } else {
          await signIn(authToken, refreshToken);
        }
      } catch (error) {
        console.error('error getting authToken', error);
        await signOut();
      }

      client.writeQuery({
        query: AUTH_TOKENS,
        data: {
          tokensInitialized: true,
        },
      });
    };

    if (!authData.tokensInitialized) {
      getToken();
    }
  }, [
    refreshTokenRequest,
    client,
    signIn,
    signOut,
    authData.tokensInitialized,
  ]);

  // whenever tokens change (after initialization), update the AsyncStorage
  useEffect(() => {
    const updateStorageForTokens = async () => {
      try {
        await AsyncStorage.setItem('authToken', authData.accessToken);
        await AsyncStorage.setItem('refreshToken', authData.refreshToken);
      } catch (e) {
        console.error('failed to update storage for tokens', e);
      }
    };

    if (authData.tokensInitialized) {
      updateStorageForTokens();
    }
  }, [authData.accessToken, authData.refreshToken, authData.tokensInitialized]);

  const handlePopupPress = useCallback(
    (pressed) => {
      if (pressed) {
        signOut();
      }
    },
    [signOut],
  );

  const authContext = useMemo(
    () => ({
      initialized: authData.tokensInitialized,
      isLoggedIn: !!authData.tokensInitialized && !!authData.accessToken,
      updateCashBackType: async (cashBackType) => {
        try {
          await AsyncStorage.setItem('cashBackType', cashBackType);
        } catch (error) {
          console.error('error saving cash back type', error);
        }
        dispatch({
          type: UPDATE_CASH_BACK_TYPE,
          payload: cashBackType,
        });
      },
      signIn,
      signOut,
      cashBackType: state.cashBackType,
    }),
    [
      authData.tokensInitialized,
      signIn,
      signOut,
      authData.accessToken,
      state.cashBackType,
    ],
  );

  return (
    <AuthContext.Provider value={authContext}>
      {children}
      {authData.isRefreshTokenExpired && (
        <PopupModal
          title="Token Expired"
          detail="Please login again"
          callback={handlePopupPress}
        />
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
