import React from 'react';

import {
  ScrollContainer,
  RowContainer,
  NotificationBell,
  SettingButton,
  Card,
} from './style';

import LinearGradientBackground from '@/components/LinearGradientBackground';

import BellIcon from '@/assets/icon_bell.svg';
import SettingIcon from '@/assets/icon_settings.svg';

const MembershipScreen = props => {
  const RightSideButtons = () => (
    <RowContainer>
      <NotificationBell
        onPress={() => props.navigation.navigate('notification')}>
        <BellIcon />
      </NotificationBell>
      <SettingButton onPress={() => props.navigation.navigate('settings')}>
        <SettingIcon />
      </SettingButton>
    </RowContainer>
  );

  return (
    <LinearGradientBackground>
      <ScrollContainer>
        <RightSideButtons />
        <Card source={require('@/assets/RewardMeCard.png')} />
      </ScrollContainer>
    </LinearGradientBackground>
  );
};

export default MembershipScreen;
