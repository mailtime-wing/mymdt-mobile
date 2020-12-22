import {useReducer, useEffect, useMemo} from 'react';
import Config from 'react-native-config';
import MailtimeAuth from 'react-native-mailtime-sdk';

import {BIND_EMAIL_ACCOUNT_API} from '@/api/data';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';

const SDK_LOGIN_READY = 'sdkLoginReady';

const UPDATE_SDK_STATUS = 'updateSdkStatus';
const UPDATE_SDK_ERROR = 'updateSdkError';
const STATUS_READY = 'Ready';
const STATUS_IN_PROCCESS = 'InProccess';
const STATUS_FAILED = 'Failed';
const STATUS_SUCCEEDED = 'Succeeded';

const initialState = {
  sdkLoginStatus: STATUS_READY,
  sdkError: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SDK_LOGIN_READY: {
      return initialState;
    }
    case UPDATE_SDK_STATUS: {
      let sdkError = state.sdkError;
      if (action.payload !== STATUS_FAILED) {
        sdkError = null;
      }
      return {
        ...state,
        sdkError,
        sdkLoginStatus: action.payload,
      };
    }
    case UPDATE_SDK_ERROR: {
      return {
        ...state,
        sdkError: action.payload,
      };
    }
    default:
      throw new Error();
  }
};

// This is the same as the one in Info.plist. Required by mailtime ios sdk
const GOOGLE_CALLBACK_SCHEME =
  'com.googleusercontent.apps.861644994731-78ig7abu1kpi2b05ilcsnb34qbmq8a9h';

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [bindEmailRequest] = useMutationWithAuth(BIND_EMAIL_ACCOUNT_API, {
    context: {
      // leave error message handling to caller
      errorMessageHandler: {
        defaultErrorMessage: null,
      },
    },
  });

  // setup for mailtime sdk
  // TODO: move to app startup in future
  useEffect(() => {
    MailtimeAuth.setup(
      Config.SDK_DEVELOPMENT === 'true',
      Config.SDK_APP_KEY,
      Config.SDK_APP_SECRET,
      GOOGLE_CALLBACK_SCHEME,
      '',
    );
    MailtimeAuth.setupAdditionalConfig(
      'PlayStore',
      Config.SDK_CLIENT_TYPE,
      '1.0',
    );
    MailtimeAuth.setAccessGoogleWithAppPassword(true);
  }, []);

  const constants = useMemo(() => MailtimeAuth.getConstants(), []);

  const login = async (emailAddress) => {
    try {
      dispatch({type: UPDATE_SDK_STATUS, payload: STATUS_IN_PROCCESS});
      const sdkToken = await MailtimeAuth.login(emailAddress);

      const {data} = await bindEmailRequest({
        variables: {
          email: emailAddress,
          token: sdkToken,
        },
      });

      if (!data?.bindEmailAccount) {
        dispatch({type: UPDATE_SDK_STATUS, payload: STATUS_FAILED});
        return;
      }

      dispatch({
        type: UPDATE_SDK_STATUS,
        payload: STATUS_SUCCEEDED,
      });
      return;
    } catch (e) {
      switch (e.code) {
        case constants.E_CANCELED: {
          dispatch({type: SDK_LOGIN_READY});
          break;
        }
        case constants.E_SDK_ERROR: {
          dispatch({type: UPDATE_SDK_STATUS, payload: STATUS_FAILED});
          dispatch({
            type: UPDATE_SDK_ERROR,
            payload: constants.E_SDK_ERROR,
          });
          break;
        }
        default:
          dispatch({type: UPDATE_SDK_STATUS, payload: STATUS_FAILED});
          dispatch({type: UPDATE_SDK_ERROR, payload: e});
          break;
      }
    }
  };

  return {
    login: login,
    reset: () => dispatch({type: SDK_LOGIN_READY}),
    loading: state.sdkLoginStatus === STATUS_IN_PROCCESS,
    loginSuccess: state.sdkLoginStatus === STATUS_SUCCEEDED,
    loginFail: state.sdkLoginStatus === STATUS_FAILED,
    error: state.sdkError,
    constants,
  };
};
