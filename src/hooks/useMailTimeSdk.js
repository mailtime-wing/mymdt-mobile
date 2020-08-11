import {useReducer, useEffect, useContext} from 'react';
import Config from 'react-native-config';
import MailtimeAuth from 'react-native-mailtime-sdk';
import {useMutation} from '@apollo/react-hooks';
import {BIND_EMAIL_ACCOUNTS_API} from '@/api/data';
import {AuthContext} from '@/context/auth';

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
      return {
        ...state,
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

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {authToken} = useContext(AuthContext);
  const [bindEmailsRequest] = useMutation(BIND_EMAIL_ACCOUNTS_API);

  // setup for mailtime sdk
  // TODO: move to app startup in future
  useEffect(() => {
    MailtimeAuth.setup(
      Config.SDK_APP_KEY,
      Config.SDK_APP_SECRET,
      'PlayStore',
      Config.SDK_CLIENT_TYPE,
      '1.0',
    );
    MailtimeAuth.setAccessGoogleWithAppPassword(false);
  }, []);

  const login = async emailAddress => {
    try {
      let sdkToken = '';
      dispatch({type: UPDATE_SDK_STATUS, payload: STATUS_IN_PROCCESS});
      sdkToken = await MailtimeAuth.login(emailAddress);

      const {data} = await bindEmailsRequest({
        context: {
          headers: {
            authorization: authToken ? `Bearer ${authToken}` : '',
          },
        },
        variables: {
          email: emailAddress,
          token: sdkToken,
        },
      });

      if (data?.bindEmailAccounts?.valids?.length !== 0) {
        dispatch({
          type: UPDATE_SDK_STATUS,
          payload: STATUS_SUCCEEDED,
        });
      } else {
        dispatch({type: UPDATE_SDK_STATUS, payload: STATUS_FAILED});
      }
    } catch (e) {
      const constants = MailtimeAuth.getConstants();
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
  };
};
