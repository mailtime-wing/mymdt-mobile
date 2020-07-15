import React from 'react';
import {ScrollView} from 'react-native';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';

const BrowseScreen = ({...props}) => (
  <LinearGradientBackground>
    <ScrollView>
      <AccountBar {...props} showCoins />
    </ScrollView>
  </LinearGradientBackground>
);

export default BrowseScreen;
