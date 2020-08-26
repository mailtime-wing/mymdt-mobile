import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import {AppState} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const initialState = {
  permission: {
    alert: false,
    badge: false,
    sound: false,
  },
  // TODO: handle badge
};
export const NotificationContext = createContext(null);

const UPDATE_PERMISSION = 'updatePermission';

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PERMISSION:
      return {
        ...state,
        permission: action.payload,
      };
    default:
      break;
  }
};

export const NotificationProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    notificationContext.checkPermission();
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange, notificationContext]);

  const notificationContext = useMemo(
    () => ({
      checkPermission: async () => {
        try {
          PushNotificationIOS.checkPermissions(permission => {
            if (permission) {
              dispatch({type: UPDATE_PERMISSION, payload: permission});
            }
          });
        } catch (e) {
          console.error('error check permission ios');
        }
      },
      notify: async details => {
        try {
          PushNotificationIOS.presentLocalNotification(details);
        } catch (e) {
          console.error('error send local noti ios');
        }
      },
      request: async () => {
        try {
          PushNotificationIOS.requestPermissions();
        } catch (e) {
          console.error('error request permission ios');
        }
      },
      permission: state.permission,
    }),
    [state.permission],
  );

  const handleAppStateChange = useCallback(
    nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        notificationContext.checkPermission();
      }

      appState.current = nextAppState;
    },
    [notificationContext],
  );

  return (
    <NotificationContext.Provider value={notificationContext}>
      {children}
    </NotificationContext.Provider>
  );
};
