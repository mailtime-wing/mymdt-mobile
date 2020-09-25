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
import {useMutation} from '@apollo/client';

import PopupModal from '@/components/PopupModal';

export const AuthContext = createContext({
  refreshAccessToken: () => {},
  refreshTokenMutationResult: {},
  updateAuthToken: () => {},
  updateCashBackType: () => {},
  signOut: () => {},
  authToken: '',
  refreshToken: '',
  cashBackType: '',
});

const UPDATE_CASH_BACK_TYPE = 'updateCashBackType';

export const MEASURABLE_REWARD_POINT = 'MRP';
export const MEASURABLE_DATA_TOKEN = 'MDT';

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
  const {data: authData} = useQuery(AUTH_TOKENS);
  const [refreshTokenRequest] = useMutation(REFRESH_TOKEN_API);

  const updateAuthToken = useCallback(
    (authToken, refreshToken) => {
      authToken = authToken || '';
      refreshToken = refreshToken || '';
      client.writeQuery({
        query: AUTH_TOKENS,
        data: {
          tokensInitialized: true,
          accessToken: authToken,
          refreshToken: refreshToken,
        },
      });
    },
    [client],
  );

  const signOut = useCallback(() => {
    client.writeQuery({
      query: AUTH_TOKENS,
      data: {
        tokensInitialized: true,
        accessToken: '',
        refreshToken: '',
        isRefreshTokenExpired: false,
      },
    });
  }, [client]);

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
              signOut();
              return;
            }
          }
        }
      } catch (error) {
        console.error('error getting authToken', error);
      }
      updateAuthToken(authToken, refreshToken);
    };
    getToken();
  }, [refreshTokenRequest, signOut, updateAuthToken]);

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

  const refreshAccessToken = useCallback(async () => {
    try {
      const {data} = await refreshTokenRequest({
        variables: {
          refreshToken: authData.refreshToken,
        },
      });
      await updateAuthToken(data.refreshAccessToken, authData.refreshToken);
      return data.refreshAccessToken;
    } catch (e) {
      signOut();
    }
  }, [refreshTokenRequest, authData.refreshToken, updateAuthToken, signOut]);

  const handlePopupPress = useCallback(
    pressed => {
      if (pressed) {
        signOut();
      }
    },
    [signOut],
  );

  const authContext = useMemo(
    () => ({
      refreshAccessToken,
      updateAuthToken,
      updateCashBackType: async cashBackType => {
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
      signOut,
      authToken: authData.accessToken,
      refreshToken: authData.refreshToken,
      cashBackType: state.cashBackType,
    }),
    [
      refreshAccessToken,
      updateAuthToken,
      signOut,
      authData.accessToken,
      authData.refreshToken,
      state.cashBackType,
    ],
  );

  if (!authData.tokensInitialized) {
    return null;
  }

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
