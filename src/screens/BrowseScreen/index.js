import React, {useEffect, useContext} from 'react';
import {ScrollView} from 'react-native';
import {NotificationContext} from '@/context/notification';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import TextButton from '@/components/TextButton';

const details = {
  alertBody: 'test for enable notification!',
  alertTitle: 'Welcome to Home page',
  userInfo: {data: 'userInfo'},
};

const marginForTest = {
  marginBottom: 20,
  // width: '60%',
  // alignSelf: 'center'
};

const BrowseScreen = ({...props}) => {
  const {notify} = useContext(NotificationContext);
  useEffect(() => {
    notify(details);
  }, [notify]);

  return (
    <LinearGradientBackground>
      <ScrollView>
        <AccountBar {...props} showCoins />
        {
          /*for test*/
          <>
            <TextButton
              variant="filled"
              text="Compact Filled Button"
              sizeVariant="compact"
              style={marginForTest}
            />
            <TextButton
              variant="filled"
              text="Normal Filled Button"
              sizeVariant="normal"
              style={marginForTest}
            />
            <TextButton
              variant="filled"
              text="Large Filled Button"
              sizeVariant="large"
              style={marginForTest}
            />
            <TextButton
              variant="outlined"
              text="Compact Outlined Button"
              sizeVariant="compact"
              style={marginForTest}
            />
            <TextButton
              variant="outlined"
              text="Normal Outlined Button"
              sizeVariant="normal"
              style={marginForTest}
            />
            <TextButton
              variant="outlined"
              text="Large Outlined Button"
              sizeVariant="large"
              style={marginForTest}
            />
            <TextButton
              variant="contrast_outlined"
              text="Compact Contrast Outlined Button"
              sizeVariant="compact"
              style={marginForTest}
            />
            <TextButton
              variant="contrast_outlined"
              text="Normal Contrast Outlined Button"
              sizeVariant="normal"
              style={marginForTest}
            />
            <TextButton
              variant="contrast_outlined"
              text="Large Contrast Outlined Button"
              sizeVariant="large"
              style={marginForTest}
            />
            <TextButton
              variant="transparent"
              text="Compact Transparent Button"
              sizeVariant="compact"
              style={marginForTest}
            />
            <TextButton
              variant="transparent"
              text="Normal Transparent Button"
              sizeVariant="normal"
              style={marginForTest}
            />
            <TextButton
              variant="transparent"
              text="Large Transparent Button"
              sizeVariant="large"
              style={marginForTest}
            />
          </>
        }
      </ScrollView>
    </LinearGradientBackground>
  );
};

export default BrowseScreen;
