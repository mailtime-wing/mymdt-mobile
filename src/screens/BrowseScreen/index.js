import React from 'react';
import {ScrollView} from 'react-native';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_CHECK_USER_CAN_UPGRADE_DATA} from '@/api/data';

import membershipLevel from '@/enum/membershipLevel';
import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import MembershipCard from '@/components/MembershipCard';
import QuickActions from '@/components/QuickActions';
import UpgradeSection from './UpgradeSection';
import CashBackSummarySection from './CashBackSummarySection';
import MembershipInfoCard from './MembershipInfoCard';

import AwardIcon from '@/assets/icon_award.svg';
import CreditCardIcon from '@/assets/icon_credit-card.svg';
import DollarSignIcon from '@/assets/dollar_sign_icon';
import BagIcon from '@/assets/icon_shopping-bag';
import ReferralIcon from '@/assets/referral_icon.svg';
import MailIcon from '@/assets/icon_mail.svg';

import {imageStyle, upgradeSection, sectionMargin} from './style';
import {useTheme} from 'emotion-theming';

import LoadingSpinner from '@/components/LoadingSpinner';

const BrowseScreen = ({navigation}) => {
  const theme = useTheme();
  const {data, loading} = useQueryWithAuth(GET_CHECK_USER_CAN_UPGRADE_DATA);

  const referFriendCount =
    data?.userProfile?.referrals.filter(
      (referral) => referral.isReferrer && referral.status === 'PROCESSED',
    ).length || 0;
  const bindDataSourceCount =
    data?.userProfile?.emailAccounts?.length ||
    0 + data?.userProfile?.bankItems?.length ||
    0;
  const currentStakeAmount = data?.userProfile?.staking?.amount || 0;

  const userLevel = data?.userProfile?.membership?.level || 0;
  const userNextLevel = userLevel + 1;
  const availableMemberships = data?.userProfile?.availableMemberships || [];
  const nextLevelMembership = availableMemberships.find(
    (ams) => ams.level === userNextLevel,
  );

  const quickActionList = [
    {
      name: 'Privileges',
      icon: AwardIcon,
      action: () => navigation.navigate('settings'),
    },
    {
      name: 'Add Email',
      icon: MailIcon,
      action: () => navigation.navigate('settings'),
    },
    {
      name: 'Add Card',
      icon: CreditCardIcon,
      action: () => navigation.navigate('settings'),
    },
    {
      name: 'Referral',
      icon: ReferralIcon,
      action: () => navigation.navigate('referral'),
    },
    {
      name: 'Selected Merchants',
      icon: BagIcon,
      action: () => navigation.navigate('settings'),
    },
    {
      name: 'Cashback type',
      icon: DollarSignIcon,
      action: () => navigation.navigate('settings'),
    },
  ];

  const levelGradientMap = {
    [membershipLevel.NEWBIE]: {
      gradient: theme.colors.membership.newbie.dashboard.gradient,
    },
    [membershipLevel.STARTER]: {
      gradient: theme.colors.membership.starter.dashboard.gradient,
    },
    [membershipLevel.EXTRA]: {
      gradient: theme.colors.membership.extra.dashboard.gradient,
    },
    [membershipLevel.ELITE]: {
      gradient: theme.colors.membership.elite.dashboard.gradient,
    },
    [membershipLevel.INFINITE]: {
      gradient: theme.colors.membership.infinite.dashboard.gradient,
    },
    [membershipLevel.INFINITE_PRIVILEGE]: {
      gradient: theme.colors.membership.infinite_privilege.dashboard.gradient,
    },
  };

  const handleCashBackSummaryPress = () => {
    navigation.navigate('cash_back_summary');
  };

  const handleViewMorePress = () => {
    navigation.navigate('membership_detail');
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  // TODO: do not linear gradient the whole scroll view
  // TODO: add card scaled shadow
  return (
    <LinearGradientBackground colors={levelGradientMap[userLevel].gradient}>
      <AccountBar navigation={navigation} showCoins />
      <ScrollView>
        <MembershipCard userLevel={userLevel} style={imageStyle} />
        <UpgradeSection
          userNextLevel={userNextLevel}
          navigation={navigation}
          style={[upgradeSection, sectionMargin]}
          membership={nextLevelMembership}
          referFriendCount={referFriendCount}
          bindDataSourceCount={bindDataSourceCount}
          currentStakeAmount={currentStakeAmount}
        />
        <CashBackSummarySection
          onPress={handleCashBackSummaryPress}
          style={sectionMargin}
        />
        <QuickActions style={sectionMargin} actionList={quickActionList} />
        <CashBackSummarySection navigation={navigation} style={sectionMargin} />
        <MembershipInfoCard
          userLevel={userLevel}
          style={sectionMargin}
          onPress={handleViewMorePress}
        />
      </ScrollView>
    </LinearGradientBackground>
  );
};

export default BrowseScreen;
