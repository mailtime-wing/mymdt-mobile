import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import useNotification from '@/hooks/useNotification';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';

const details = {
  alertBody: 'test for enable notification!',
  alertTitle: 'Welcome to Home page',
  userInfo: {data: 'userInfo'},
};

const BrowseScreen = ({...props}) => {
  const [notify] = useNotification();
  useEffect(() => {
    notify(details);
  }, [notify]);

  return (
    <LinearGradientBackground>
      <ScrollView>
        <AccountBar {...props} showCoins />
      </ScrollView>
    </LinearGradientBackground>
  );
};

export default BrowseScreen;
