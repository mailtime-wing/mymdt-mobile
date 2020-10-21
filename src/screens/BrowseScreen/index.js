import React from 'react';
import {ScrollView} from 'react-native';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_MEMBERSHIP_API} from '@/api/data';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import MembershipCard from '@/components/MembershipCard';
import UpgradeSection from './UpgradeSection';
import ShortcutSection from './ShortcutSection';
import CashBackSummarySection from './CashBackSummarySection';
import MembershipInfoCard from './MembershipInfoCard';

import {imageStyle, upgradeSection, sectionMargin} from './style';

const BrowseScreen = ({navigation}) => {
  const {data} = useQueryWithAuth(GET_USER_MEMBERSHIP_API, {
    fetchPolicy: 'network-only',
  });

  const userLevel = data?.userProfile?.membership?.level || 0;
  const userNextLevel = userLevel + 1;

  return (
    <LinearGradientBackground>
      <ScrollView>
        <AccountBar navigation={navigation} showCoins />
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
