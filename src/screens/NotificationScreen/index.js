import React from 'react';
import {FormattedMessage} from 'react-intl';
import ModalContainer from '@/components/ModalContainer';

import {
  ScrollContainer,
  NotificationContainer,
  Subject,
  Detail,
  Divider,
} from './style';

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
  {
    subject: 'New data reward from email receipt',
    detail:
      'Reward you 50 points for Apple Store email receipt on 16 November 2019.',
  },
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
  {
    subject: 'New data reward from email receipt',
    detail:
      'Reward you 50 points for Apple Store email receipt on 16 November 2019.',
  },
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
  {
    subject: 'New data reward from email receipt',
    detail:
      'Reward you 50 points for Apple Store email receipt on 16 November 2019.',
  },
];

const NotificationScreen = () => {
  return (
    <ScrollContainer>
      <ModalContainer
        title={
          <FormattedMessage id="notification" defaultMessage="Notification" />
        }
      />
      {dummyData.map(notification => (
        <>
          <NotificationContainer>
            <Subject>{notification.subject}</Subject>
            <Detail>{notification.detail}</Detail>
          </NotificationContainer>
          <Divider />
        </>
      ))}
    </ScrollContainer>
  );
};

export default NotificationScreen;
