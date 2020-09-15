import React, {useEffect, useContext, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {NotificationContext} from '@/context/notification';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import AppButton from '@/components/AppButton';
import AppIcon from '@/components/AppIcon';
import AppAvator from '@/components/AppAvator';
import PopupModal from '@/components/PopupModal';
import PopupModalWithLinearGradient from '@/components/PopupModalWithLinearGradient';
import MRPGiftBox from '@/components/MRPGiftBox';
import RewardGotPopup from '@/components/RewardGotPopup';

import HomeIcon from '@/assets/home.svg';
import HeartIcon from '@/assets/heart_icon.svg';
import {FormattedMessage} from 'react-intl';

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
  const [showReward, setShowReward] = useState(false);
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
                <AppAvator
                  variant="default"
                  sizeVariant="small"
                  imageSrc={require('@/assets/dog_avatar.png')}
                />
                <AppAvator
                  variant="default"
                  sizeVariant="normal"
                  imageSrc={require('@/assets/dog_avatar.png')}
                />
                <AppAvator
                  variant="default"
                  sizeVariant="large"
                  imageSrc={require('@/assets/dog_avatar.png')}
                />
              </View>
              <View style={rowForTest}>
                <AppAvator
                  variant="initials"
                  sizeVariant="small"
                  name="Alice"
                />
                <AppAvator
                  variant="initials"
                  sizeVariant="normal"
                  name="Boris"
                />
                <AppAvator
                  variant="initials"
                  sizeVariant="large"
                  name="Charlie"
                />
              </View>
              <View style={rowForTest}>
                <AppAvator
                  variant="icons"
                  sizeVariant="small"
                  imageSrc={require('@/assets/star.png')}
                />
                <AppAvator
                  variant="icons"
                  sizeVariant="normal"
                  imageSrc={require('@/assets/star.png')}
                />
                <AppAvator
                  variant="icons"
                  sizeVariant="large"
                  imageSrc={require('@/assets/star.png')}
                />
              </View>
              <View style={rowForTest}>
                <AppAvator
                  variant="image"
                  sizeVariant="small"
                  imageSrc={require('@/assets/dog_avatar.png')}
                />
                <AppAvator
                  variant="image"
                  sizeVariant="normal"
                  imageSrc={require('@/assets/dog_avatar.png')}
                />
                <AppAvator
                  variant="image"
                  sizeVariant="large"
                  imageSrc={require('@/assets/dog_avatar.png')}
                />
              </View>
            </View>

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
                text="Click to get reward"
                sizeVariant="normal"
                colorVariant="secondary"
                svgIcon={HomeIcon}
                style={marginForTest}
                onPress={() => setShowReward(true)}
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
                text="Click to open linear-gradient"
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
              <RewardGotPopup
                visible={showReward}
                onOkPress={() => setShowReward(false)}
                rewardName={<FormattedMessage id="reward_type_check_in" />}
                rewardAmount={20}
                convert={true}
              />
            </View>
          </>
        }
      </ScrollView>
    </LinearGradientBackground>
  );
};

export default BrowseScreen;
