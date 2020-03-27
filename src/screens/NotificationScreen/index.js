import React from 'react';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {FormattedMessage} from 'react-intl';

import Button from '@/components/Button';

import {Container, Title, Detail, Skip} from './style';

const NotificationScreen = ({navigation, route}) => {
  const {authToken} = route.params;

  const requestNotificationPermission = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions();
    }
  };

  const sendLocalNotification = () => {
    const details = {
      alertBody: 'You enabled notification!',
      alertTitle: 'Welcome to MDT!',
      userInfo: {data: 'userInfo'},
    };
    PushNotificationIOS.presentLocalNotification(details);
  };

  const handleSkipPress = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.checkPermissions(e => {
        if (e.alert) {
          sendLocalNotification();
        }
      });
    }
    navigation.navigate('account_setup_done', {authToken: authToken});
  };

  return (
    <Container>
      <Title>
        <FormattedMessage id="want_to_receive_latest_info" />
      </Title>
      <Detail>
        <FormattedMessage id="turn_on_notifications_to_learn" />
      </Detail>
      <Button onPress={() => requestNotificationPermission()}>
        <FormattedMessage id="sure" />
      </Button>
      <Skip onPress={() => handleSkipPress()}>
        <FormattedMessage id="skip_for_now" />
      </Skip>
    </Container>
  );
};

export default NotificationScreen;
