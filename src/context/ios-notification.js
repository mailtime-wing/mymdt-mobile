import React, {createContext, useReducer, useEffect, useMemo} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const initialState = {
  permission: {
    alert: false,
    badge: false,
    sound: false,
  }
  // TODO: handle badge
}
export const NotificationContext = createContext(null);

const UPDATE_PERMISSON = 'updatePermission';

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PERMISSON:
      return {
        ...state,
        permission: action.payload
      }
    default:
      break;
  }
}

export const NotificationProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() =>{
    notificationContext.checkPermission()
  }, [notificationContext], state)

  const notificationContext = useMemo(
    () => ({
      checkPermission: async () => {
        try {
          PushNotificationIOS.checkPermissions(p => {
            if (p) {
              dispatch({ type: UPDATE_PERMISSON, payload: p });
            }
          })
        } catch (e) {
          console.error('error check permission ios');
        }
      },
      notify: async (details) => {
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
      permission: state.permission
    }),
    [
      state.permission
    ]
  )

  return (
    <NotificationContext.Provider value={notificationContext}>
      {children}
    </NotificationContext.Provider>
  )
}