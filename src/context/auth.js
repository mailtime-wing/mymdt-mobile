import React, {createContext, useReducer, useEffect, useMemo} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';
import {REFRESH_TOKEN_API} from '@/api/auth';
import {useMutation} from '@apollo/react-hooks';

import SplashScreen from '@/screens/SplashScreen';
import PopupModal from '@/components/PopupModal';

export const AuthContext = createContext(null);

const UPDATE_AUTH_TOKEN = 'updateAuthToken';
const UPDATE_USER_ACCCOUNT_DATA = 'updateUserAccountData';
const UPDATE_REFRESH_TOKEN_EXPIRED = 'updateRefreshTokenExpired';
const UPDATE_CASH_BACK_TYPE = 'updateCashBackType';
const SIGN_OUT = 'signOut';

export const REWARD_POINT = 'Reward Point';
export const MDT = 'Measurable Data Token';

const initialState = {
  isLoading: true,
  authToken: null,
  isEmailBound: null,
  isProfileCompleted: null,
  refreshToken: null,
  isRefreshTokenExpired: null,
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
    case UPDATE_USER_ACCCOUNT_DATA: {
      return {
        ...state,
        isLoading: false,
        isEmailBound: action.payload.isEmailBound,
        isProfileCompleted: action.payload.isProfileCompleted,
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
        isEmailBound: null,
        isProfileCompleted: null,
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

  useEffect(() => {
    const getUserAccountData = async () => {
      let isEmailBound;
      let isProfileCompleted;
      try {
        isEmailBound = await AsyncStorage.getItem('isEmailBound');
        isProfileCompleted = await AsyncStorage.getItem('isProfileCompleted');
      } catch (error) {
        console.error('error getting account data');
      }
      dispatch({
        type: UPDATE_USER_ACCCOUNT_DATA,
        payload: {
          isEmailBound: JSON.parse(isEmailBound),
          isProfileCompleted: JSON.parse(isProfileCompleted),
        },
      });
    };
    getUserAccountData();
  }, []);

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
      updateUserAccountData: async ({isEmailBound, isProfileCompleted}) => {
        try {
          await AsyncStorage.setItem(
            'isEmailBound',
            JSON.stringify(isEmailBound),
          );
          await AsyncStorage.setItem(
            'isProfileCompleted',
            JSON.stringify(isProfileCompleted),
          );
        } catch (error) {
          console.error('error saving user data');
        }
        dispatch({
          type: UPDATE_USER_ACCCOUNT_DATA,
          payload: {
            isEmailBound: isEmailBound,
            isProfileCompleted: isProfileCompleted,
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
          await AsyncStorage.removeItem('isEmailBound');
          await AsyncStorage.removeItem('isProfileCompleted');
        } catch (error) {
          console.error('error when sign out');
        }
        dispatch({type: SIGN_OUT});
      },
      authToken: state.authToken,
      refreshToken: state.refreshToken,
      isEmailBound: state.isEmailBound,
      isProfileCompleted: state.isProfileCompleted,
    }),
    [
      state.authToken,
      state.refreshToken,
      state.isEmailBound,
      state.isProfileCompleted,
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

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
