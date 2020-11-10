import React, {useLayoutEffect} from 'react';
import {ScrollView, Image} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';
import {titleStyle, image, lines} from './style';

import AppText from '@/components/AppText2';
import MembershipGlareCard from '@/components/MembershipGlareCard';

import MembershipCardList from './MembershipCardList';

import membershipLevel from '@/enum/membershipLevel';

const MembershipDetailScreen = ({navigation}) => {
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: {
        backgroundColor: theme.colors.linesBackground,
      },
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
        backgroundColor: theme.colors.linesBackground,
      },
    });
  }, [navigation, theme.colors.linesBackground]);

  const levelCardList = [
    {
      level: membershipLevel.NEWBIE,
      label: <FormattedMessage id="membership_level_0" />,
      card: (
        <MembershipGlareCard userLevel={membershipLevel.NEWBIE} style={image} />
      ),
      backgroundColor: theme.colors.membership.newbie.card.background,
      textColor: theme.colors.membership.newbie.card.text,
      starColor: theme.colors.membership.newbie.star,
      membership: {},
      upgradeAvailale: false,
      downgradeAvailale: false,
    },
    {
      level: membershipLevel.STARTER,
      label: <FormattedMessage id="membership_level_1" />,
      card: (
        <MembershipGlareCard
          userLevel={membershipLevel.STARTER}
          style={image}
        />
      ),
      backgroundColor: theme.colors.membership.starter.card.background,
      textColor: theme.colors.membership.starter.card.text,
      starColor: theme.colors.membership.starter.star,
      membership: {
        cashbackPercentage: 0.5,
        merchantsNumAllowed: 2,
        dataSourceBindingsNumRequired: 1,
      },
      upgradeAvailale: true,
      downgradeAvailale: true,
    },
    {
      level: membershipLevel.EXTRA,
      label: <FormattedMessage id="membership_level_2" />,
      card: (
        <MembershipGlareCard userLevel={membershipLevel.EXTRA} style={image} />
      ),
      backgroundColor: theme.colors.membership.extra.card.background,
      textColor: theme.colors.membership.extra.card.text,
      starColor: theme.colors.membership.extra.star,
      membership: {
        cashbackPercentage: 1,
        merchantsNumAllowed: 3,
        dataSourceBindingsNumRequired: 2,
        referralsNumRequired: 1,
      },
      upgradeAvailale: true,
      downgradeAvailale: true,
    },
    {
      level: membershipLevel.ELITE,
      label: <FormattedMessage id="membership_level_3" />,
      card: (
        <MembershipGlareCard userLevel={membershipLevel.ELITE} style={image} />
      ),
      backgroundColor: theme.colors.membership.elite.card.background,
      textColor: theme.colors.membership.elite.card.text,
      starColor: theme.colors.membership.elite.star,
      membership: {
        cashbackPercentage: 2,
        merchantsNumAllowed: 4,
        stakingInterestRate: 8,
        referralsNumRequired: 20,
        stakingPlan: {
          amount: 100000,
        },
      },
      upgradeAvailale: true,
      downgradeAvailale: true,
    },
    {
      level: membershipLevel.INFINITE,
      label: <FormattedMessage id="membership_level_4" />,
      card: (
        <MembershipGlareCard
          userLevel={membershipLevel.INFINITE}
          style={image}
        />
      ),
      backgroundColor: theme.colors.membership.infinite.card.background,
      textColor: theme.colors.membership.infinite.card.text,
      starColor: theme.colors.membership.infinite.star,
      membership: {
        cashbackPercentage: 4,
        merchantsNumAllowed: 7,
        stakingInterestRate: 15,
        stakingPlan: {
          amount: 250000,
        },
      },
      upgradeAvailale: true,
      downgradeAvailale: true,
    },
    {
      level: membershipLevel.INFINITE_PRIVILEGE,
      label: <FormattedMessage id="membership_level_5" />,
      card: (
        <MembershipGlareCard
          userLevel={membershipLevel.INFINITE_PRIVILEGE}
          style={image}
        />
      ),
      backgroundColor:
        theme.colors.membership.infinite_privilege.card.background,
      textColor: theme.colors.membership.infinite_privilege.card.text,
      starColor: theme.colors.membership.infinite_privilege.star,
      membership: {
        cashbackPercentage: 10,
        merchantsNumAllowed: 10,
        stakingInterestRate: 20,
        isInvitationRequired: true,
      },
      upgradeAvailale: false,
      downgradeAvailale: false,
    },
  ];

  return (
    <ScrollView>
      <Image source={require('@/assets/lines.png')} style={lines} />
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
