import React, {useEffect, useContext, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {NotificationContext} from '@/context/notification';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import AppButton from '@/components/AppButton';
import AppIcon from '@/components/AppIcon';
import PopupModal from '@/components/PopupModal';
import PopupModalWithLinearGradient from '@/components/PopupModalWithLinearGradient';
import MRPGiftBox from '@/components/MRPGiftBox';

import HomeIcon from '@/assets/home.svg';
import HeartIcon from '@/assets/heart_icon.svg';

const details = {
  alertBody: 'test for enable notification!',
  alertTitle: 'Welcome to Home page',
  userInfo: {data: 'userInfo'},
};

const rowForTest = {
  flexDirection: 'row',
  paddingBottom: 24,
  justifyContent: 'space-between',
  alignItems: 'center',
};

const marginForTest = {
  marginBottom: 20,
};

const testStyle = {
  margin: 24,
  padding: 24,
};

const BrowseScreen = ({...props}) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const [showLinearGradient, setShowLinearGradient] = useState(false);
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
            <View
              style={[
                css`
                  ${theme.colors.elevatedBackground1}
                `,
                testStyle,
              ]}>
              <View style={rowForTest}>
                <AppIcon
                  sizeVariant="small"
                  color={theme.colors.background1}
                  backgroundColor={theme.colors.secondary.normal}
                  svgIcon={HeartIcon}
                />
                <AppIcon
                  sizeVariant="normal"
                  color={theme.colors.background1}
                  backgroundColor={theme.colors.secondary.normal}
                  svgIcon={HeartIcon}
                />
                <AppIcon
                  sizeVariant="large"
                  color={theme.colors.background1}
                  backgroundColor={theme.colors.secondary.normal}
                  svgIcon={HeartIcon}
                />
              </View>
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
                text="Click to open pop up"
                sizeVariant="large"
                colorVariant="alert"
                svgIcon={HomeIcon}
                style={marginForTest}
                onPress={() => setShow(true)}
              />
              <AppButton
                variant="filled"
                text="Click to get reward"
                sizeVariant="large"
                colorVariant="contrast"
                svgIcon={HomeIcon}
                style={marginForTest}
                onPress={() => setShowLinearGradient(true)}
              />
              <AppButton
                variant="filled"
                text="Normal Filled Disabled Secondary"
                sizeVariant="normal"
                colorVariant="secondary"
                svgIcon={HomeIcon}
                style={marginForTest}
                disabled
              />
            </View>

            <View
              style={[
                css`
                  ${theme.colors.elevatedBackground2}
                `,
                testStyle,
              ]}>
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
            </View>

            <View
              style={[
                css`
                  ${theme.colors.elevatedBackground3}
                `,
                testStyle,
              ]}>
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
              <PopupModal
                visible={show}
                title="Test"
                detail="This is Pop Up Modal"
                callback={() => setShow(false)}
              />

              <PopupModalWithLinearGradient
                visible={showLinearGradient}
                callback={() => setShowLinearGradient(false)}>
                {<MRPGiftBox />}
              </PopupModalWithLinearGradient>
            </View>
          </>
        }
      </ScrollView>
    </LinearGradientBackground>
  );
};

export default BrowseScreen;
