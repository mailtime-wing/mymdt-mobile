import React from 'react';
import {ScrollView} from 'react-native';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {FormattedMessage} from 'react-intl';
import {GET_CHECK_USER_CAN_UPGRADE_DATA, GET_MERCHANTS_API} from '@/api/data';

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

import {AUTH_TOKENS} from '@/api/auth';
import {useQuery} from '@apollo/client';
import useSWR from 'swr';

const url = 'https://distribute-alpha.reward.me/cashback/summary?period=7';

const BrowseScreen = ({navigation}) => {
  const theme = useTheme();
  const {data, loading} = useQueryWithAuth(GET_CHECK_USER_CAN_UPGRADE_DATA);
  const {data: merchantsData, loading: merchantsLoading} = useQueryWithAuth(
    GET_MERCHANTS_API,
  );

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

  const {data: authData} = useQuery(AUTH_TOKENS);
  const fetcher = (...args) =>
    fetch(...args, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
    }).then((res) => res.json());
  const {data: fetchedData} = useSWR(url, fetcher);
  // TODO: handle error

  const quickActionList = [
    {
      name: <FormattedMessage id="privileges" defaultMessage="Privileges" />,
      icon: AwardIcon,
      action: () => navigation.navigate('membership_detail'),
    },
    {
      name: <FormattedMessage id="add_email" defaultMessage="Add Email" />,
      icon: MailIcon,
      action: () =>
        navigation.navigate('settings', {screen: 'emails_binding_edit'}),
    },
    {
      name: <FormattedMessage id="add_card" defaultMessage="Add Card" />,
      icon: CreditCardIcon,
      action: () =>
        navigation.navigate('settings', {screen: 'linked_cards_setting'}),
    },
    {
      name: <FormattedMessage id="referral" defaultMessage="Referral" />,
      icon: ReferralIcon,
      action: () => navigation.navigate('referral'),
    },
    {
      name: (
        <FormattedMessage
          id="selected_merchants"
          defaultMessage="Selected Merchants"
        />
      ),
      icon: BagIcon,
      action: () =>
        navigation.navigate('settings', {screen: 'merchants_preference'}),
    },
    {
      name: (
        <FormattedMessage id="cashback_type" defaultMessage="Cashback type" />
      ),
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
    navigation.navigate('cash_back_summary', {
      cashBackTotal: fetchedData.data.total_cashback || 0,
      cashBackTotalInPeriod: fetchedData.data.total_cashback_in_period || 0,
    });
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
        <QuickActions style={sectionMargin} actionList={quickActionList} />
        {merchantsLoading ? (
          <LoadingSpinner />
        ) : (
          <CashBackSummarySection
            navigation={navigation}
            onPress={handleCashBackSummaryPress}
            style={sectionMargin}
            merchantsData={merchantsData?.merchants}
            summaryData={fetchedData}
          />
        )}
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
