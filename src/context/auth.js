import React, {createContext, useReducer, useEffect, useMemo} from 'react';
import {Alert, AsyncStorage} from 'react-native';
import {NavigationContainer as Container} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeStack from '@/screens/HomeStack';
import ModalStack from '@/screens/ModalStack';
import SignInScreen from '@/screens/SignInScreen';
import SplashScreen from '@/screens/SplashScreen';

export const AuthContext = createContext(null);
const Stack = createStackNavigator();

const testAccount = {
  userid: '19',
  phone: '12345678',
  email: 'wing',
  password: '1',
  name: 'Wing',
  surname: 'Chan',
  company: 'mailtime',
  lastLoginAt: null,
};

const UPDATE_AUTH_TOKEN = 'updateAuthToken';
const SIGN_IN = 'signIn';
const SIGN_OUT = 'signOut';

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

export const AuthProvider = () => {
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
      signIn: async (email, password) => {
        if (email === testAccount.email && password === testAccount.password) {
          try {
            await AsyncStorage.setItem('authToken', 'dummy_auth_token');
          } catch (error) {
            console.error('error saving token');
          }

          dispatch({type: SIGN_IN, payload: 'dummy_auth_token'});
        } else {
          Alert.alert('email or password is wrong!');
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
    }),
    [],
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: authContext.signIn,
        signOut: authContext.signOut,
        authToken: state.authToken,
      }}>
      <Container>
        <Stack.Navigator mode="modal" headerMode="none">
          {state.authToken == null ? (
            <Stack.Screen name="SignIn" component={SignInScreen} />
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeStack} />
              <Stack.Screen name="Modal" component={ModalStack} />
            </>
          )}
        </Stack.Navigator>
      </Container>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
