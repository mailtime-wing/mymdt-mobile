import React from 'react';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';

const BrowseScreen = ({...props}) => (
  <LinearGradientBackground>
    <AccountBar {...props} />
  </LinearGradientBackground>
);

export default BrowseScreen;
