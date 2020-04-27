import React from 'react';
import {Container, AppName, Icon} from './style';

const SplashScreen = () => (
  <Container>
    <Icon source={require('@/assets/rewardme.png')} />
    <AppName>RewardMe</AppName>
  </Container>
);

export default SplashScreen;
