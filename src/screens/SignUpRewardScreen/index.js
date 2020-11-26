import React, {useRef, useEffect, useState, useContext} from 'react';
import {Animated, View, TouchableOpacity} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {AuthContext} from '@/context/auth';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import MDTGiftBox from '@/components/MDTGiftBox';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';
import useSetupFlow from '@/hooks/useSetupFlow';
import {REWARD_DOLLAR, ME} from '@/constants/currency';

import {
  container,
  gotContainer,
  gotRewardText,
  GiftIcon,
  textContainer,
  ContinueButton,
  button,
} from './style';
import {useTheme} from 'emotion-theming';

const AnimatedText = (props) => {
  const fadeAnim = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const fadeInFadeOut = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => fadeInFadeOut());
    };
    fadeInFadeOut();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
};

const AnimatedFloat = (props) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const float = () => {
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 4,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: -4,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => float());
    };
    float();
  });

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: floatAnim,
          },
        ],
      }}>
      {props.children}
    </Animated.View>
  );
};

const GiftBoxReady = ({setIsOpened}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setIsOpened(true)}
      style={container}>
      <AppText variant="heading4" style={gotRewardText(theme)}>
        <FormattedMessage
          id="got_sign_up_reward"
          default="You got a sign-up reward"
        />
      </AppText>
      <AnimatedFloat>
        <GiftIcon source={require('@/assets/icon_gift.png')} />
      </AnimatedFloat>
      <AnimatedText>
        <AppText variant="heading1" style={gotRewardText(theme)}>
          <FormattedMessage id="tap_to_open" default="Tap to open" />
        </AppText>
      </AnimatedText>
    </TouchableOpacity>
  );
};

const GiftBoxOpened = ({isOpened, navigateByFlow, rewardAmount}) => {
  const theme = useTheme();
  const {cashBackType} = useContext(AuthContext);
  const isRewardDollar = cashBackType === REWARD_DOLLAR;
  const TextColor = isRewardDollar
    ? theme.colors.secondary.normal
    : theme.colors.primary.normal;

  const handleContinuePress = () => {
    navigateByFlow();
  };

  return (
    <View style={gotContainer}>
      <MDTGiftBox />
      <View style={textContainer}>
        <AppText variant="heading1" style={{color: TextColor}}>
          <FormattedMessage id="you_got" default="You got" />
          <TransactionAmount
            amount={rewardAmount}
            unitVariant={isRewardDollar ? REWARD_DOLLAR : ME}
            unitColor={TextColor}
            unitSizeVariant="normal"
            amountSizeVariant="large"
            amountColor={TextColor}
            showDecimal={false}
          />
        </AppText>
      </View>

      <ContinueButton>
        {isOpened && (
          <AppButton
            onPress={handleContinuePress}
            text={<FormattedMessage id="button.continue" default="continue" />}
            variant="filled"
            sizeVariant="large"
            colorVariant="secondary"
            style={button}
          />
        )}
      </ContinueButton>
    </View>
  );
};

const SignUpRewardScreen = ({route}) => {
  const [isOpened, setIsOpened] = useState(false);
  const {navigateByFlow} = useSetupFlow();
  const accountSetupReward = route?.params?.accountSetupReward;
  const rewardAmount = accountSetupReward?.value || 0;

  return (
    <LinearGradientBackground>
      <View style={container}>
        {isOpened ? (
          <GiftBoxOpened
            navigateByFlow={navigateByFlow}
            isOpened={isOpened}
            rewardAmount={rewardAmount}
          />
        ) : (
          <GiftBoxReady setIsOpened={setIsOpened} />
        )}
      </View>
    </LinearGradientBackground>
  );
};

export default SignUpRewardScreen;
