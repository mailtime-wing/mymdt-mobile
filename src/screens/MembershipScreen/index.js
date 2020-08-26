import React, {useLayoutEffect} from 'react';

import {
  ScrollContainer,
  RowContainer,
  NotificationBell,
  SettingButton,
  Card,
} from './style';

import LinearGradientBackground from '@/components/LinearGradientBackground';
import ScreenContainer from '@/components/ScreenContainer';

import BellIcon from '@/assets/icon_bell.svg';
import SettingIcon from '@/assets/icon_settings.svg';

const MembershipScreen = ({navigation}) => {
  useLayoutEffect(() => {
    const RightSideButtons = () => (
      <RowContainer>
        <NotificationBell onPress={() => navigation.navigate('notification')}>
          <BellIcon />
        </NotificationBell>
        <SettingButton onPress={() => navigation.navigate('settings')}>
          <SettingIcon />
        </SettingButton>
      </RowContainer>
    );

    navigation.setOptions({
      headerRight: RightSideButtons,
    });
  }, [navigation]);

  return (
    <LinearGradientBackground>
      <ScrollContainer>
        <ScreenContainer hasTopBar headerTransparent>
          <Card source={require('@/assets/RewardMeCard.png')} />
        </ScreenContainer>
      </ScrollContainer>
    </LinearGradientBackground>
  );
};

export default MembershipScreen;
