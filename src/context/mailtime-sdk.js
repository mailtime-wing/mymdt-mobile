import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import MailtimeAuth from 'react-native-mailtime-sdk';
import {useMutation} from '@apollo/react-hooks';
import {BIND_EMAIL_ACCOUNTS_API} from '@/api/data';
import {AuthContext} from '@/context/auth';

export const SdkContext = createContext(null);

const SDK_LOGIN_READY = 'sdkLoginReady';
const SDK_LOGIN_SUCCESS = 'sdkLoginSuccess';
const SDK_LOGIN_SUCCESS_AND_BINDING_SUCCESS =
  'sdkLoginSuccessAndBindingSuccess';
const SDK_LOGIN_SUCCESS_AND_BINDING_FAIL = 'sdkLoginSuccessAndBindingFail';
const SDK_LOGIN_FAIL = 'sdkLoginError';
const SDK_LOGIN_CANCELL = 'sdkLoginCancell';
const SDK_LOGGING_IN = 'sdkLoggingIn';
const SDK_LOGIN_FINISH = 'sdkLoginFinish';

const initialState = {
  isLoginError: false,
  isLoginCancelled: false,
  isBindingSuccess: null,
  isLoggingIn: false,
  error: '',
  sdkToken: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case SDK_LOGIN_READY: {
      return initialState;
    }
    case SDK_LOGIN_SUCCESS: {
      return {
        ...state,
        sdkToken: action.payload,
      };
    }
    case SDK_LOGIN_SUCCESS_AND_BINDING_SUCCESS: {
      return {
        ...state,
        isBindingSuccess: true,
      };
    }
    case SDK_LOGIN_SUCCESS_AND_BINDING_FAIL: {
      return {
        ...state,
        isBindingSuccess: false,
      };
    }
    case SDK_LOGIN_FAIL: {
      return {
        ...state,
        isLoginError: true,
        error: action.payload,
      };
    }
    case SDK_LOGIN_CANCELL: {
      return {
        ...state,
        isLoginCancelled: true,
      };
    }
    case SDK_LOGGING_IN: {
      return {
        ...state,
        isLoggingIn: true,
      };
    }
    case SDK_LOGIN_FINISH: {
      return {
        ...state,
        isLoggingIn: false,
      };
    }
    default:
      throw new Error();
  }
};

export const SdkProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {authToken} = useContext(AuthContext);
  const [bindEmailsRequest] = useMutation(BIND_EMAIL_ACCOUNTS_API);
  console.log(state);

  // setup android mailtime sdk
  useEffect(() => {
    if (Platform.OS === 'ios') {
      // ios config setup later
    } else {
      MailtimeAuth.setup(
        Config.SDK_APP_KEY,
        Config.SDK_APP_SECRET,
        'PlayStore',
        Config.SDK_CLIENT_TYPE,
        '1.0',
      );
    }
  }, []);

  const sdkContext = useMemo(
    () => ({
      loginMailTimeSdk: async emailAddress => {
        try {
          let sdkToken = '';
          if (Platform.OS === 'ios') {
            // handle ios later
          } else {
            dispatch({type: SDK_LOGGING_IN});
            sdkToken = await MailtimeAuth.login(emailAddress);
            dispatch({type: SDK_LOGIN_SUCCESS, payload: sdkToken});
          }
          console.log('sdkToken', sdkToken);
          const {data} = await bindEmailsRequest({
            context: {
              headers: {
                authorization: authToken ? `Bearer ${authToken}` : '',
              },
            },
            variables: {
              email: emailAddress,
              token: 'divmvg5gbp7kz24czj72t5jzf',
            },
          });
          if (data.bindEmailAccounts.valids.length !== 0) {
            dispatch({type: SDK_LOGIN_SUCCESS_AND_BINDING_SUCCESS});
          } else {
            dispatch({type: SDK_LOGIN_SUCCESS_AND_BINDING_FAIL});
          }
          dispatch({type: SDK_LOGIN_FINISH});
        } catch (e) {
          const constants = MailtimeAuth.getConstants();
          switch (e.code) {
            case constants.E_CANCELED: {
              dispatch({type: SDK_LOGIN_CANCELL});
              break;
            }
            case constants.E_SDK_ERROR: {
              dispatch({type: SDK_LOGIN_FAIL, payload: constants.E_SDK_ERROR});
              break;
            }
            default:
              dispatch({type: SDK_LOGIN_FAIL, payload: e});
              break;
          }
          dispatch({type: SDK_LOGIN_FINISH});
        }
      },
      sdkState: state,
      initiateSdk: () => dispatch({type: SDK_LOGIN_READY}),
    }),
    [authToken, bindEmailsRequest, state],
  );

  return (
    <SdkContext.Provider value={sdkContext}>{children}</SdkContext.Provider>
  );
};

export default SdkProvider;
