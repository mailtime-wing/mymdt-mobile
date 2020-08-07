import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import {REFRESH_TOKEN_API} from '@/api/auth';
import {useMutation} from '@apollo/react-hooks';

import PopupModal from '@/components/PopupModal';

export const AuthContext = createContext(null);

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
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  useEffect(() => {
    // check notification permission
    if (Platform.OS === 'ios') {
      PushNotificationIOS.checkPermissions(e => {
        if (e.alert) {
          setNotificationEnabled(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const getToken = async () => {
      let authToken;
      let refreshToken;
      let newToken;
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
              newToken = data.refreshAccessToken;
              authContext.updateAuthToken(newToken, refreshToken);
            } catch (e) {
              console.warn('error refreshing token', e);
              dispatch({type: UPDATE_REFRESH_TOKEN_EXPIRED, payload: true});
            }
          }
        }
      } catch (error) {
        console.error('error getting authToken');
      }
      dispatch({
        type: UPDATE_AUTH_TOKEN,
        payload: {
          authToken: authToken,
          refreshToken: refreshToken,
        },
      });
    };
    getToken();
  }, [authContext, refreshTokenRequest]);

  const handlePopupPress = pressed => {
    if (pressed) {
      dispatch({type: SIGN_OUT});
    }
  };

  const authContext = useMemo(
    () => ({
      updateAuthToken: async (authToken, refreshToken) => {
        try {
          await AsyncStorage.setItem('authToken', authToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);
        } catch (error) {
          console.error('error saving authToken');
        }
        dispatch({
          type: UPDATE_AUTH_TOKEN,
          payload: {
            authToken: authToken,
            refreshToken: refreshToken,
          },
        });
      },
      updateCashBackType: async cashBackType => {
        try {
          await AsyncStorage.setItem('cashBackType', cashBackType);
        } catch (error) {
          console.error('error saving cash back type');
        }
        dispatch({
          type: UPDATE_CASH_BACK_TYPE,
          payload: cashBackType,
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('authToken');
          await AsyncStorage.removeItem('refreshToken');
        } catch (error) {
          console.error('error when sign out');
        }
        dispatch({type: SIGN_OUT});
      },
      authToken: state.authToken,
      refreshToken: state.refreshToken,
      cashBackType: state.cashBackType,
      notificationEnabled: notificationEnabled,
    }),
    [
      state.authToken,
      state.refreshToken,
      state.cashBackType,
      notificationEnabled,
    ],
  );

  if (state.isRefreshTokenExpired) {
    return (
      <PopupModal
        title="Token Expired"
        detail="Please login again"
        callback={handlePopupPress}
      />
    );
  }

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
