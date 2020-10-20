import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import Config from 'react-native-config';
import MailtimePush from 'react-native-mailtime-push';
import {getUniqueId} from 'react-native-device-info';

import {AuthContext} from '@/context/auth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {REGISTER_DEVICE} from '@/api/auth';
import {GET_USER_ID} from '@/api/data';

import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import notificationStatus from '@/enum/notificationStatus';

const INITIAL_PERMISSIONS = {
  alert: true, // Android default enabled alert
  badge: false,
  sound: false,
  authorizationStatus: notificationStatus.Authorized, // Android default authorized
};

const UPDATE_PERMISSION = 'updatePermission';
const UPDATE_DEVICE_TOKEN = 'updateDeviceToken';
const UPDATE_DEVICE_PLATFORM = 'updateDevicePlatform';
const initialState = {
  permissions: INITIAL_PERMISSIONS,
  deviceId: getUniqueId(),
  deviceToken: '',
  platform: '',
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
    case UPDATE_DEVICE_PLATFORM:
      return {
        ...state,
        platform: action.payload,
      };
    default:
      break;
  }
};

export const NotificationProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {authToken} = useContext(AuthContext);
  const [registerDevice] = useMutationWithAuth(REGISTER_DEVICE);
  const {data} = useQueryWithAuth(GET_USER_ID, {skip: !authToken});
  const userId = data?.userProfile?.id;

  useEffect(() => {
    MailtimePush.init(
      Config.DEFAULT_NOTIFICATION_CHANNEL_ID,
      Config.DEFAULT_NOTIFICATION_CHANNEL_NAME,
    );

    const getPlatformAndToken = async () => {
      try {
        const mtPush = await MailtimePush.register(userId);
        dispatch({type: UPDATE_DEVICE_TOKEN, payload: mtPush.token});
        dispatch({type: UPDATE_DEVICE_PLATFORM, payload: mtPush.platform});
      } catch (e) {
        console.error('error getPlatformAndToken', e);
      }
    };
    if (state.permissions.alert && userId) {
      getPlatformAndToken();
    }
  }, [state.permissions.alert, userId]);

  const checkPermissions = useCallback(async () => {
    const deniedPermission = {
      ...initialState.permissions,
      alert: false,
      authorizationStatus: notificationStatus.Denied,
    };
    try {
      const permissionStatus = await RNAndroidNotificationListener.getPermissionStatus();
      // permissions result can be 'authorized' or 'denied'
      if (permissionStatus === 'denied') {
        dispatch({
          type: UPDATE_PERMISSION,
          payload: deniedPermission,
        });
        return deniedPermission;
      }

      if (permissionStatus === 'authorized') {
        dispatch({
          type: UPDATE_PERMISSION,
          payload: initialState.permissions,
        });
      }
      return initialState.permissions;
    } catch (e) {
      console.error('error check permission android', e);
      dispatch({type: UPDATE_PERMISSION, payload: deniedPermission});
      return deniedPermission;
    }
  }, []);

  const request = useCallback(async () => {
    try {
      return await RNAndroidNotificationListener.requestPermission();
    } catch (e) {
      console.error('error request permission android');
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
    checkPermissions();
  }, [checkPermissions]);

  useEffect(() => {
    const _registerDevice = async () => {
      try {
        await registerDevice({
          variables: {
            deviceId: state.deviceId,
            platform: state.platform,
            pushToken: state.deviceToken,
          },
        });
      } catch (e) {
        console.error('fail to register device', e);
        // TODO: what to do if it fails?
      }
    };

    if (state.deviceToken && state.platform && authToken) {
      _registerDevice();
    }
  }, [
    authToken,
    registerDevice,
    state.deviceId,
    state.deviceToken,
    state.platform,
  ]);

  return (
    <NotificationContext.Provider value={notificationContext}>
      {children}
    </NotificationContext.Provider>
  );
};
