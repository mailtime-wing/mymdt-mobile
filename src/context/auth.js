import React, {createContext, useReducer, useEffect, useMemo} from 'react';
import {Alert, AsyncStorage} from 'react-native';
import SplashScreen from '@/screens/SplashScreen';

export const AuthContext = createContext(null);

const testAccount = {
  userid: '19',
  phone: '12345678',
  verificationCode: '191919',
  name: 'Wing',
  surname: 'Chan',
  company: 'mailtime',
  lastLoginAt: null,
};

const UPDATE_AUTH_TOKEN = 'updateAuthToken';
const SIGN_IN = 'signIn';
const SIGN_OUT = 'signOut';
const SIGN_UP = 'signUp';

const initialState = {
  isLoading: true,
  isSignIn: false,
  authToken: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_AUTH_TOKEN: {
      return {
        ...state,
        isLoading: false,
        authToken: action.payload,
      };
    }
    case SIGN_IN: {
      return {
        ...state,
        isSignIn: true,
        authToken: action.payload,
      };
    }
    case SIGN_UP: {
      return {
        ...state,
        isSignIn: false,
        // authToken: action.payload,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        isSignIn: false,
        authToken: null,
      };
    }
    default:
      throw new Error();
  }
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let authToken;
    const getToken = async () => {
      try {
        authToken = await AsyncStorage.getItem('authToken');
      } catch (error) {
        console.error('error getting authToken');
      }
      dispatch({type: UPDATE_AUTH_TOKEN, payload: authToken});
    };
    getToken();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (phone, verificationCode) => {
        if (
          phone === testAccount.phone &&
          verificationCode === testAccount.verificationCode
        ) {
          try {
            // intergate login api
            await AsyncStorage.setItem('authToken', 'dummy_auth_token');
          } catch (error) {
            console.error('error saving token');
          }

          dispatch({type: SIGN_IN, payload: 'dummy_auth_token'});
        } else {
          Alert.alert('phone or verificationCode is wrong!');
        }
      },
      signUp: async (phone, verificationCode) => {
        if (phone && verificationCode) {
          try {
            Alert.alert('success to register!');
            // intergate register api
            // await AsyncStorage.setItem('authToken', 'dummy_auth_token');
          } catch (error) {
            console.error('error saving token');
          }

          dispatch({type: SIGN_UP, payload: 'dummy_auth_token'});
        } else {
          Alert.alert('phone or verificationCode cannot be empty!');
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('authToken');
        } catch (error) {
          console.error('error clear token');
        }
        dispatch({type: SIGN_OUT});
      },
      authToken: state.authToken,
    }),
    [state.authToken],
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
