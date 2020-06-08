import React, {useContext} from 'react';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {FormattedMessage} from 'react-intl';
import {AuthContext} from '@/context/auth';

import ThemeButton from '@/components/ThemeButton';

import {
  Container,
  Title,
  Detail,
  MarginContainer,
  ScrollContainer,
  NotificationPermission,
  UpArrow,
} from './style';

const NotificationPermissionScreen = ({navigation}) => {
  const {isSignupRewardGot} = useContext(AuthContext);
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

    if (isSignupRewardGot) {
      navigation.navigate('home');
    } else {
      navigation.navigate('account_setup_done');
    }
  };

  return (
    <ScrollContainer>
      <Container>
        <Title>
          <FormattedMessage
            id="want_to_receive_latest_info"
            defaultMessage="Receive Latest Info"
          />
        </Title>
        <Detail>
          <FormattedMessage
            id="turn_on_notifications_to_learn"
            defaultMessage="Turn on notifications to receive news about new rewards, latest promotional events and limited offers."
          />
        </Detail>
        <NotificationPermission
          source={require('@/assets/notification_permission.png')}
        />
        <UpArrow source={require('@/assets/arrow_up.png')} />
        <ThemeButton onPress={requestNotificationPermission}>
          <FormattedMessage id="sure" />
        </ThemeButton>
        <MarginContainer />
        <ThemeButton reverse small onPress={handleSkipPress}>
          <FormattedMessage id="skip_for_now" />
        </ThemeButton>
      </Container>
    </ScrollContainer>
  );
};

export default NotificationPermissionScreen;
