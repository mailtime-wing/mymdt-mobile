import React, {useEffect, useContext} from 'react';
import {ScrollView} from 'react-native';
import {NotificationContext} from '@/context/notification';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import AppButton from '@/components/AppButton';

import HomeIcon from '@/assets/home.svg';

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
            <AppButton
              variant="filled"
              text="Compact Filled Primary"
              sizeVariant="compact"
              colorVariant="primary"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
            <AppButton
              variant="filled"
              text="Normal Filled Secondary"
              sizeVariant="normal"
              colorVariant="secondary"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
            <AppButton
              variant="filled"
              text="Large Filled Alert"
              sizeVariant="large"
              colorVariant="alert"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
            <AppButton
              variant="filled"
              text="Large Filled Contrast"
              sizeVariant="large"
              colorVariant="contrast"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
            <AppButton
              variant="outlined"
              text="Compact Outlined Primary"
              sizeVariant="compact"
              colorVariant="primary"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
            <AppButton
              variant="outlined"
              text="Normal Outlined Secondary"
              sizeVariant="normal"
              colorVariant="secondary"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
            <AppButton
              variant="outlined"
              text="Large Outlined Alert"
              sizeVariant="large"
              colorVariant="alert"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
            <AppButton
              variant="outlined"
              text="Large Outlined Contrast"
              sizeVariant="large"
              colorVariant="contrast"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
            <AppButton
              variant="transparent"
              text="Compact Transparent Primary"
              sizeVariant="compact"
              colorVariant="primary"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
            <AppButton
              variant="transparent"
              text="Compact Transparent Secondary"
              sizeVariant="compact"
              colorVariant="secondary"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
            <AppButton
              variant="transparent"
              text="Normal Transparent Alert"
              sizeVariant="normal"
              colorVariant="alert"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
            <AppButton
              variant="transparent"
              text="Large Transparent Contrast"
              sizeVariant="large"
              colorVariant="contrast"
              svgIcon={HomeIcon}
              style={marginForTest}
            />
          </>
        }
      </ScrollView>
    </LinearGradientBackground>
  );
};

export default BrowseScreen;
