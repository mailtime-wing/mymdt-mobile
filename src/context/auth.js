import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import {REFRESH_TOKEN_API} from '@/api/auth';
import {useMutation} from '@apollo/react-hooks';

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

const UPDATE_AUTH_TOKEN = 'updateAuthToken';
const UPDATE_REFRESH_TOKEN_EXPIRED = 'updateRefreshTokenExpired';
const UPDATE_CASH_BACK_TYPE = 'updateCashBackType';
const SIGN_OUT = 'signOut';

export const MEASURABLE_REWARD_POINT = 'MRP';
export const MEASURABLE_DATA_TOKEN = 'MDT';

const initialState = {
  isLoading: true,
  authToken: null,
  refreshToken: null,
  isRefreshTokenExpired: null,
  cashBackType: MEASURABLE_REWARD_POINT, // discuss before to set reward point as default cash back type
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_AUTH_TOKEN: {
      return {
        ...state,
        isLoading: false,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case UPDATE_REFRESH_TOKEN_EXPIRED: {
      return {
        ...state,
        isRefreshTokenExpired: action.payload,
      };
    }
    case UPDATE_CASH_BACK_TYPE: {
      return {
        ...state,
        cashBackType: action.payload,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        authToken: null,
        refreshToken: null,
        isRefreshTokenExpired: null,
      };
    }
    default:
      throw new Error();
  }
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [refreshTokenRequest] = useMutation(REFRESH_TOKEN_API);

  const updateAuthToken = useCallback(async (authToken, refreshToken) => {
    authToken = authToken || '';
    refreshToken = refreshToken || '';
    try {
      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      console.error('error saving authToken', error);
    }

    dispatch({
      type: UPDATE_AUTH_TOKEN,
      payload: {
        authToken: authToken,
        refreshToken: refreshToken,
      },
    });
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const {data} = await refreshTokenRequest({
        variables: {
          refreshToken: state.refreshToken,
        },
      });
      await updateAuthToken(data.refreshAccessToken, state.refreshToken);
      return data.refreshAccessToken;
    } catch (e) {
      dispatch({type: UPDATE_REFRESH_TOKEN_EXPIRED, payload: true});
    }
  }, [refreshTokenRequest, state.refreshToken, updateAuthToken]);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('refreshToken');
    } catch (e) {
      console.error('error removing authToken', e);
    }
    dispatch({type: SIGN_OUT});
  }, []);

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
              dispatch({type: UPDATE_REFRESH_TOKEN_EXPIRED, payload: true});
            }
          }
        }
      } catch (error) {
        console.error('error getting authToken', error);
      }
      updateAuthToken(authToken, refreshToken);
    };
    getToken();
  }, [refreshTokenRequest, updateAuthToken]);

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
      authToken: state.authToken,
      refreshToken: state.refreshToken,
      cashBackType: state.cashBackType,
    }),
    [
      refreshAccessToken,
      updateAuthToken,
      signOut,
      state.authToken,
      state.refreshToken,
      state.cashBackType,
    ],
  );

  if (state.isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      {children}
      {state.isRefreshTokenExpired && (
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
