import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const INITIAL_PERMISSIONS = {
  alert: false,
  badge: false,
  sound: false,
};

const initialContextValue = {
  permissions: INITIAL_PERMISSIONS,
  checkPermissions: () => Promise.resolve(INITIAL_PERMISSIONS),
  notify: () => {},
  request: () => Promise.resolve(),
};
export const NotificationContext = createContext(initialContextValue);

const UPDATE_PERMISSION = 'updatePermission';
const initialState = {
  permissions: INITIAL_PERMISSIONS,
  // TODO: handle badge
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PERMISSION:
      return {
        ...state,
        permissions: action.payload,
      };
    default:
      break;
  }
};

export const NotificationProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkPermissions = useCallback(async () => {
    try {
      const permissions = await new Promise(resolve =>
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

  const notify = useCallback(details => {
    try {
      PushNotificationIOS.presentLocalNotification(details);
    } catch (e) {
      console.error('error send local noti ios');
    }
  }, []);

  const request = useCallback(async () => {
    try {
      await PushNotificationIOS.requestPermissions();
    } catch (e) {
      console.error('error request permission ios');
    }
  }, []);

  const notificationContext = useMemo(
    () => ({
      checkPermissions,
      notify,
      request,
      permissions: state.permissions,
    }),
    [checkPermissions, notify, request, state.permissions],
  );

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  return (
    <NotificationContext.Provider value={notificationContext}>
      {children}
    </NotificationContext.Provider>
  );
};
