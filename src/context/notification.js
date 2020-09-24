import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {getUniqueId} from 'react-native-device-info';

import {AuthContext} from '@/context/auth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {REGISTER_DEVICE} from '@/api/auth';

const INITIAL_PERMISSIONS = {
  alert: false,
  badge: false,
  sound: false,
  // TODO: check again after https://github.com/react-native-community/push-notification-ios/pull/185 is merged
  authorizationStatus:
    PushNotificationIOS.AuthorizationStatus
      ?.UNAuthorizationStatusNotDetermined || 0,
};

const UPDATE_PERMISSION = 'updatePermission';
const UPDATE_DEVICE_TOKEN = 'updateDeviceToken';
const initialState = {
  permissions: INITIAL_PERMISSIONS,
  // TODO: handle badge
  deviceId: getUniqueId(),
  deviceToken: '',
};

const initialContextValue = {
  state: initialState,
  checkPermissions: () => Promise.resolve(INITIAL_PERMISSIONS),
  notify: () => {},
  request: () => Promise.resolve(),
};
export const NotificationContext = createContext(initialContextValue);

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PERMISSION:
      return {
        ...state,
        permissions: action.payload,
      };
    case UPDATE_DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: action.payload,
      };
    default:
      break;
  }
};

const IOS = Platform.OS === 'ios';

export const NotificationProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {authToken} = useContext(AuthContext);
  const [registerDevice] = useMutationWithAuth(REGISTER_DEVICE);

  const checkPermissions = useCallback(async () => {
    try {
      let permissions;
      if (IOS) {
        permissions = await new Promise(resolve =>
          PushNotificationIOS.checkPermissions(resolve),
        );
      }

      if (!permissions) {
        dispatch({type: UPDATE_PERMISSION, payload: initialState.permissions});
        return initialState.permissions;
      }

      dispatch({type: UPDATE_PERMISSION, payload: permissions});
      return permissions;
    } catch (e) {
      console.error('error check permission ios');
      dispatch({type: UPDATE_PERMISSION, payload: initialState.permissions});
      return initialState.permission;
    }
  }, []);

  const notify = useCallback(details => {
    try {
      if (IOS) {
        PushNotificationIOS.presentLocalNotification(details);
      }
    } catch (e) {
      console.error('error send local noti ios');
    }
  }, []);

  const request = useCallback(async () => {
    try {
      if (IOS) {
        return await PushNotificationIOS.requestPermissions();
      }
      return {};
    } catch (e) {
      console.error('error request permission ios');
      return {};
    }
  }, []);

  const notificationContext = useMemo(
    () => ({
      checkPermissions,
      notify,
      request,
      state,
    }),
    [checkPermissions, notify, request, state],
  );

  useEffect(() => {
    const initPermissions = async () => {
      const permissions = await checkPermissions();
      if (permissions.alert) {
        request();
      }
    };

    initPermissions();
  }, [checkPermissions, request]);

  useEffect(() => {
    const handler = deviceToken => {
      dispatch({type: UPDATE_DEVICE_TOKEN, payload: deviceToken});
    };

    PushNotificationIOS.addEventListener('register', handler);
    return () => {
      PushNotificationIOS.removeEventListener('register', handler);
    };
  }, []);

  useEffect(() => {
    const _registerDevice = async () => {
      try {
        const platform = Platform.OS === 'ios' ? 'apns' : '';
        await registerDevice({
          variables: {
            deviceId: state.deviceId,
            platform,
            pushToken: state.deviceToken,
          },
        });
      } catch (e) {
        // TODO: what to do if it fails?
      }
    };

    if (state.deviceToken && authToken) {
      _registerDevice();
    }
  }, [authToken, registerDevice, state.deviceId, state.deviceToken]);

  return (
    <NotificationContext.Provider value={notificationContext}>
      {children}
    </NotificationContext.Provider>
  );
};
