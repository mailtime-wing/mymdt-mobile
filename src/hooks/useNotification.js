import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
import {useState, useEffect, useCallback} from 'react';

export default function useNotification() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.checkPermissions(e => {
        if (e.alert) {
          setEnabled(true);
        }
      });
    }
  }, [enabled, request]);

  const request = useCallback(() => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions();
    }
  }, []);

  const notify = details => {
    if (enabled) {
      if (Platform.OS === 'ios') {
        PushNotificationIOS.presentLocalNotification(details);
      }
    }
  };

  return [notify, request, {notificationEnabled: enabled}];
}
