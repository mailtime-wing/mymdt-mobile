import React from 'react';
import {ScrollView} from 'react-native';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_MEMBERSHIP_API} from '@/api/data';

import membershipLevel from '@/enum/membershipLevel';
import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import MembershipCard from '@/components/MembershipCard';
import UpgradeSection from './UpgradeSection';
import ShortcutSection from './ShortcutSection';
import CashBackSummarySection from './CashBackSummarySection';
import MembershipInfoCard from './MembershipInfoCard';

import {imageStyle, upgradeSection, sectionMargin} from './style';
import {useTheme} from 'emotion-theming';

const BrowseScreen = ({navigation}) => {
  const theme = useTheme();
  const {data} = useQueryWithAuth(GET_USER_MEMBERSHIP_API, {
    fetchPolicy: 'network-only',
  });

  const levelGradientList = [
    {
      level: membershipLevel.NEWBIE,
      gradient: theme.colors.membership.newbie.gradient,
    },
    {
      level: membershipLevel.STARTER,
      gradient: theme.colors.membership.starter.gradient,
    },
    {
      level: membershipLevel.EXTRA,
      gradient: theme.colors.membership.extra.gradient,
    },
    {
      level: membershipLevel.ELITE,
      gradient: theme.colors.membership.elite.gradient,
    },
    {
      level: membershipLevel.INFINITE,
      gradient: theme.colors.membership.infinite.gradient,
    },
    {
      level: membershipLevel.INFINITE_PRIVILEGE,
      gradient: theme.colors.membership.infinite_privilege.gradient,
    },
  ];

  const userLevel = data?.userProfile?.membership?.level || 0;
  const userNextLevel = userLevel + 1;

  // TODO: do not linear gradient the whole scroll view
  // TODO: add card scaled shadow
  return (
    <LinearGradientBackground
      colors={
        levelGradientList.find(
          (levelGradient) => userLevel === levelGradient.level,
        )?.gradient
      }>
      <AccountBar navigation={navigation} showCoins />
      <ScrollView>
        <MembershipCard userLevel={userLevel} style={imageStyle} />
        <UpgradeSection
          userNextLevel={userNextLevel}
          navigation={navigation}
          style={[upgradeSection, sectionMargin]}
        />
        <ShortcutSection navigation={navigation} style={sectionMargin} />
        <CashBackSummarySection navigation={navigation} style={sectionMargin} />
        <MembershipInfoCard userLevel={userLevel} style={sectionMargin} />
      </ScrollView>
    </LinearGradientBackground>
  );
};

export default BrowseScreen;
