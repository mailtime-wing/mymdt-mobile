import React, {useEffect, useContext} from 'react';
import {ScrollView} from 'react-native';
import {NotificationContext} from '@/context/ios-notification';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';

const details = {
  alertBody: 'test for enable notification!',
  alertTitle: 'Welcome to Home page',
  userInfo: {data: 'userInfo'},
};

const BrowseScreen = ({...props}) => {
  const {notify} = useContext(NotificationContext)
  useEffect(() => {
    notify(details);
  }, []);

  return (
    <LinearGradientBackground>
      <ScrollView>
        <AccountBar {...props} showCoins />
      </ScrollView>
    </LinearGradientBackground>
  );
};

export default BrowseScreen;
