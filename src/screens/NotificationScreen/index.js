import React from 'react';
import {FormattedMessage} from 'react-intl';
import {View, ScrollView} from 'react-native';
import ModalContainer from '@/components/ModalContainer';
import AppText from '@/components/AppText2';

import {divider, detailStyle, subjectStyle, container} from './style';
import {useTheme} from 'emotion-theming';

const dummyData = [
  {
    subject: 'New data reward from email receipt',
    detail: 'Reward you 50 points for Uber email receipt on 17 December 2019.',
  },
  {
    subject: 'Received a referral reward',
    detail:
      'Your friend, Foo Bar (+852 9876 ****) joined RewardMe on 2 December 2019 with your referral code.',
  },
  {
    subject: 'New data reward from email receipt',
    detail:
      'Reward you 50 points for Apple Store email receipt on 16 November 2019.',
  },
  {
    subject: 'New data reward from email receipt',
    detail:
      'Reward you 50 points for Apple Store email receipt on 16 November 2019.',
  },
];

const NotificationScreen = () => {
  const theme = useTheme();
  return (
    <ScrollView>
      <ModalContainer
        title={
          <FormattedMessage id="notification" defaultMessage="Notification" />
        }
      />
      {dummyData.map(({subject, detail}, i) => (
        <View key={i}>
          <View style={container}>
            <AppText variant="body1" style={subjectStyle(theme)}>
              {subject}
            </AppText>
            <AppText variant="caption" style={detailStyle(theme)}>
              {detail}
            </AppText>
          </View>
          <View style={divider(theme)} />
        </View>
      ))}
    </ScrollView>
  );
};

export default NotificationScreen;
