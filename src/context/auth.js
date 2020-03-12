import React, {createContext, useReducer, useEffect, useMemo} from 'react';
import {AsyncStorage} from 'react-native';
import SplashScreen from '@/screens/SplashScreen';

export const AuthContext = createContext(null);

const UPDATE_AUTH_TOKEN = 'updateAuthToken';
const SIGN_OUT = 'signOut';

const initialState = {
  isLoading: true,
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
    case SIGN_OUT: {
      return {
        ...state,
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
      updateAuthToken: async authToken => {
        try {
          await AsyncStorage.setItem('authToken', authToken);
        } catch (error) {
          console.error('error saving authToken');
        }
        dispatch({type: UPDATE_AUTH_TOKEN, payload: authToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('authToken');
        } catch (error) {
          console.error('error clear authToken');
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
