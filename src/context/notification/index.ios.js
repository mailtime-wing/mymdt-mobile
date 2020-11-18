import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {getUniqueId} from 'react-native-device-info';

import {AuthContext} from '@/context/auth';
import {IntlContext} from '@/context/Intl';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {REGISTER_DEVICE} from '@/api/auth';
import notificationStatus from '@/enum/notificationStatus';

const INITIAL_PERMISSIONS = {
  alert: false,
  badge: false,
  sound: false,
  authorizationStatus: notificationStatus.NotDetermined,
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

export const NotificationProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {isLoggedIn} = useContext(AuthContext);
  const {localeEnum} = useContext(IntlContext);
  const [registerDevice] = useMutationWithAuth(REGISTER_DEVICE);

  const checkPermissions = useCallback(async () => {
    try {
      let permissions;
      permissions = await new Promise((resolve) =>
        PushNotificationIOS.checkPermissions(resolve),
      );

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

  const request = useCallback(async () => {
    try {
      return await PushNotificationIOS.requestPermissions();
    } catch (e) {
      console.error('error request permission ios');
      return {};
    }
  }, []);

  const notificationContext = useMemo(
    () => ({
      checkPermissions,
      request,
      state,
    }),
    [checkPermissions, request, state],
  );

  useEffect(() => {
    const initPermissions = async () => {
      const permissions = await checkPermissions();
      // always request to trigger `register` event for device token
      if (
        permissions.authorizationStatus !== notificationStatus.NotDetermined
      ) {
        request();
      }
    };

    initPermissions();
  }, [checkPermissions, request]);

  useEffect(() => {
    const handler = (deviceToken) => {
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
        await registerDevice({
          variables: {
            deviceId: state.deviceId,
            platform: 'apns',
            pushToken: state.deviceToken,
            locale: localeEnum,
          },
        });
      } catch (e) {
        // TODO: what to do if it fails?
      }
    };

    if (state.deviceToken && isLoggedIn) {
      _registerDevice();
    }
  }, [
    isLoggedIn,
    registerDevice,
    state.deviceId,
    state.deviceToken,
    localeEnum,
  ]);

  return (
    <NotificationContext.Provider value={notificationContext}>
      {children}
    </NotificationContext.Provider>
  );
};
