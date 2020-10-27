import React from 'react';
import {ScrollView} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';
import {titleStyle, image} from './style';

import AppText from '@/components/AppText2';
import MembershipCard from '@/components/MembershipCard';

import MembershipCardList from './MembershipCardList';

import membershipLevel from '@/enum/membershipLevel';

const levelCardList = [
  {
    level: membershipLevel.STARTER,
    label: <FormattedMessage id="membership_level_0" />,
    card: <MembershipCard userLevel={membershipLevel.STARTER} style={image} />,
    privileges: ['Cashback in 2 selected merchants 0.5% cashback'],
    requirements: [],
  },
  {
    level: membershipLevel.EXTRA,
    label: <FormattedMessage id="membership_level_1" />,
    card: <MembershipCard userLevel={membershipLevel.EXTRA} style={image} />,
    privileges: ['Cashback in 3 selected merchants 1% cashback'],
    requirements: [{name: 'Total Referral', detail: '2 friends'}],
  },
  {
    level: membershipLevel.ELITE,
    label: <FormattedMessage id="membership_level_2" />,
    card: <MembershipCard userLevel={membershipLevel.ELITE} style={image} />,
    privileges: [
      'Cashback in 4 selected merchants 1.5% cashback',
      'Birthday gift',
    ],
    requirements: [
      {name: 'Total Referral', detail: '10 friends'},
      {name: 'MDT Lockup', detail: '10,000 for 12 months'},
    ],
  },
  {
    level: membershipLevel.INFINITE,
    label: <FormattedMessage id="membership_level_3" />,
    card: <MembershipCard userLevel={membershipLevel.INFINITE} style={image} />,
    privileges: [
      'Cashback in 4 selected merchants 2% cashback',
      'Birthday gift',
      'Netflix 6 months subscription',
    ],
    requirements: [
      {name: 'Total Referral', detail: '15 friends'},
      {name: 'MDT Lockup', detail: '50,000 for 12 months'},
    ],
  },
  {
    level: membershipLevel.INFINITE_PRIVILEGE,
    label: <FormattedMessage id="membership_level_4" />,
    card: (
      <MembershipCard
        userLevel={membershipLevel.INFINITE_PRIVILEGE}
        style={image}
      />
    ),
    privileges: [
      'Cashback in all merchants supported 4% cashback',
      'Birthday gift',
      'Netflix 1 year subscription',
    ],
    requirements: [
      {name: 'Total Referral', detail: '100 friends'},
      {name: 'MDT Lockup', detail: '100,000 for 12 months'},
    ],
  },
  // {
  //   level: membershipLevel.NEWBIE,
  //   label: <FormattedMessage id='membership_level_5' />,
  //   card: <MembershipCard userLevel={membershipLevel.STARTER} style={image} />,
  //   privileges: [],
  //   requirements: [],
  // },
];

const MembershipDetailScreen = () => {
  const theme = useTheme();
  return (
    <ScrollView>
      <AppText variant="heading2" style={titleStyle(theme)}>
        <FormattedMessage
          id="membership_program"
          defaultMessage="Membership program"
        />
      </AppText>
      <MembershipCardList cardList={levelCardList} />
    </ScrollView>
  );
};

export default MembershipDetailScreen;
