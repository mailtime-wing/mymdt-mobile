import React from 'react';
import {ScrollView} from 'react-native';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_MEMBERSHIP_API} from '@/api/data';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import MembershipCard from '@/components/MembershipCard';
import UpgradeSection from './UpgradeSection';

import {imageStyle, upgradeSection} from './style';

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
          style={upgradeSection}
        />
      </ScrollView>
    </LinearGradientBackground>
  );
};

export default BrowseScreen;
