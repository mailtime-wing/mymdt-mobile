import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import {NotificationContext} from '@/context/ios-notification';

import ThemeButton from '@/components/ThemeButton';
import useSetupFlow from '@/hooks/useSetupFlow';
import AppText from '@/components/AppText2';

import {
  Container,
  MarginContainer,
  NotificationPermission,
  UpArrow,
  titleStyle,
  detailStyle,
} from './style';

const details = {
  alertBody: 'You enabled notification!',
  alertTitle: 'Welcome to MDT!',
  userInfo: {data: 'userInfo'},
};

const NotificationPermissionScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  const {notify, request} = useContext(NotificationContext);

  const requestNotificationPermission = () => {
    request();
    notify(details);
    navigateByFlow();
  };

  const handleSkipPress = () => {
    navigateByFlow();
  };

  return (
    <ScrollView>
      <Container>
        <AppText variant="pageTitle" style={titleStyle(theme)}>
          <FormattedMessage
            id="want_to_receive_latest_info"
            defaultMessage="Receive Latest Info"
          />
        </AppText>
        <AppText variant="body1" style={detailStyle(theme)}>
          <FormattedMessage
            id="turn_on_notifications_to_learn"
            defaultMessage="Turn on notifications to receive news about new rewards, latest promotional events and limited offers."
          />
        </AppText>
        <NotificationPermission
          source={require('@/assets/notification_permission.png')}
        />
        <UpArrow source={require('@/assets/arrow_up.png')} />
        <ThemeButton onPress={requestNotificationPermission}>
          <FormattedMessage id="sure" />
        </ThemeButton>
        <MarginContainer />
        <ThemeButton reverse medium onPress={handleSkipPress}>
          <FormattedMessage id="skip_for_now" />
        </ThemeButton>
      </Container>
    </ScrollView>
  );
};

export default NotificationPermissionScreen;
