import React, {createContext, useReducer, useEffect, useMemo} from 'react';
import {AsyncStorage} from 'react-native';
import SplashScreen from '@/screens/SplashScreen';

export const AuthContext = createContext(null);

const UPDATE_AUTH_TOKEN = 'updateAuthToken';
const UPDATE_USER_ACCCOUNT_DATA = 'updateUserAccountData';
const SIGN_OUT = 'signOut';

const initialState = {
  isLoading: true,
  authToken: null,
  isEmailBound: null,
  isProfileCompleted: null
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
    case UPDATE_USER_ACCCOUNT_DATA: {
      return {
        ...state,
        isLoading: false,
        isEmailBound: action.payload.isEmailBound,
        isProfileCompleted: action.payload.isProfileCompleted,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        authToken: null,
        isEmailBound: null,
        isProfileCompleted: null
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
  
  useEffect(() => {
    let isEmailBound;
    let isProfileCompleted;
    const getUserAccountData = async () => {
      try {
        isEmailBound = await AsyncStorage.getItem('isEmailBound');
        isProfileCompleted = await AsyncStorage.getItem('isProfileCompleted');
      } catch (error) {
        console.error('error getting account data');
      }
      dispatch({type: UPDATE_USER_ACCCOUNT_DATA, payload: {
        isEmailBound: JSON.parse(isEmailBound), 
        isProfileCompleted: JSON.parse(isProfileCompleted)}
      });
    };
    getUserAccountData();
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
      updateUserAccountData: async ({isEmailBound, isProfileCompleted}) => {
        try {
          await AsyncStorage.setItem('isEmailBound', JSON.stringify(isEmailBound));
          await AsyncStorage.setItem('isProfileCompleted', JSON.stringify(isProfileCompleted));
        } catch (error) {
          console.error('error saving user data');
        }
        dispatch({type: UPDATE_USER_ACCCOUNT_DATA, payload: {isEmailBound: isEmailBound, isProfileCompleted: isProfileCompleted}});
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
      isEmailBound: state.isEmailBound,
      isProfileCompleted: state.isProfileCompleted,
    }),
    [state.authToken, state.isEmailBound, state.isProfileCompleted],
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
