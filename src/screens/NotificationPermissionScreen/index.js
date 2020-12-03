import React, {useContext} from 'react';
import {ScrollView, Image} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import {NotificationContext} from '@/context/notification';
import {ThemeContext} from '@/context/theme';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import useSetupFlow from '@/hooks/useSetupFlow';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {UPDATE_NOTIFICATION} from '@/api/data';

import ArrowUpIcon from '@/assets/arrow_up_icon.svg';

import {
  Container,
  MarginContainer,
  notificationPermission,
  arrowUp,
  titleStyle,
  detailStyle,
} from './style';

const NotificationPermissionScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  const {request} = useContext(NotificationContext);
  const {isDark} = useContext(ThemeContext);
  const [updateNotification] = useMutationWithAuth(UPDATE_NOTIFICATION);

  const imageSource = isDark
    ? require('@/assets/notification_permission_dark.png')
    : require('@/assets/notification_permission.png');

  const requestNotificationPermission = async () => {
    try {
      const permissions = await request();
      updateNotification({
        variables: {
          enabled: permissions.alert,
        },
      });
    } catch (error) {}

    navigateByFlow();
  };

  const handleSkipPress = () => {
    navigateByFlow();
  };

  return (
    <ScrollView>
      <Container>
        <AppText variant="heading1" style={titleStyle(theme)}>
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
        <Image source={imageSource} style={notificationPermission} />
        <ArrowUpIcon style={arrowUp} fill={theme.colors.secondary.normal} />
        <AppButton
          onPress={requestNotificationPermission}
          text={<FormattedMessage id="button.sure" />}
          variant="filled"
          sizeVariant="large"
          colorVariant="secondary"
        />
        <MarginContainer />
        <AppButton
          onPress={handleSkipPress}
          text={<FormattedMessage id="button.skip_for_now" />}
          variant="outlined"
          sizeVariant="normal"
          colorVariant="secondary"
        />
      </Container>
    </ScrollView>
  );
};

export default NotificationPermissionScreen;
