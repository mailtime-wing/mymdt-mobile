import React, {useRef, useEffect, useState} from 'react';
import {Animated, View, TouchableOpacity, Image} from 'react-native';
import {FormattedMessage} from 'react-intl';

import LinearGradientBackground from '@/components/LinearGradientBackground';
import MDTGiftBox from '@/components/MDTGiftBox';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';
import useSetupFlow from '@/hooks/useSetupFlow';
import {REWARD_DOLLAR, ME} from '@/constants/currency';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_CURRENCY_CODE, GET_CONVERSION_RATE_API} from '@/api/data';

import {
  openContainer,
  readyContainer,
  gotRewardText,
  textContainer,
  giftIcon,
  inner,
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

const GiftBoxReady = ({onPress}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={readyContainer}>
      <AppText variant="heading4" style={gotRewardText(theme)}>
        <FormattedMessage
          id="got_sign_up_reward"
          default="You got a sign-up reward"
        />
      </AppText>
      <AnimatedFloat>
        <Image source={require('@/assets/icon_gift.png')} style={giftIcon} />
      </AnimatedFloat>
      <AnimatedText>
        <AppText variant="heading1" style={gotRewardText(theme)}>
          <FormattedMessage id="tap_to_open" default="Tap to open" />
        </AppText>
      </AnimatedText>
    </TouchableOpacity>
  );
};

const GiftBoxOpened = ({isRewardDollar, rewardAmount, handleContinuePress}) => {
  const theme = useTheme();
  const TextColor = isRewardDollar
    ? theme.colors.secondary.normal
    : theme.colors.primary.normal;

  return (
    <View style={openContainer}>
      <MDTGiftBox />
      <View style={inner}>
        <View style={textContainer}>
          <AppText variant="heading1" style={{color: TextColor}}>
            <FormattedMessage id="you_got" default="You got" />{' '}
            <TransactionAmount
              amount={rewardAmount}
              unitVariant={isRewardDollar ? REWARD_DOLLAR : ME}
              unitColor={TextColor}
              unitSizeVariant="normal"
              amountSizeVariant="large"
              amountColor={TextColor}
              showDecimal={false}
            />{' '}
            !
          </AppText>
        </View>
        <AppButton
          onPress={handleContinuePress}
          text={<FormattedMessage id="button.continue" default="continue" />}
          variant="filled"
          sizeVariant="large"
          colorVariant="secondary"
        />
      </View>
    </View>
  );
};

const SignUpRewardScreen = ({route}) => {
  const [isOpened, setIsOpened] = useState(false);
  const {navigateByFlow} = useSetupFlow();
  const {data} = useQueryWithAuth(GET_CURRENCY_CODE);
  const accountSetupReward = route?.params?.accountSetupReward;
  const rewardAmount = accountSetupReward?.value || 0;
  const {data: conversionRateData} = useQueryWithAuth(GET_CONVERSION_RATE_API, {
    skip: rewardAmount === 0,
    variables: {
      from: REWARD_DOLLAR,
      to: ME,
    },
  });
  const cashBackType = data?.userProfile?.cashbackCurrencyCode;
  const conversionRate = conversionRateData?.conversionRate || 0;
  const isRewardDollar = cashBackType === REWARD_DOLLAR;
  const rewardAmountInMe = rewardAmount * conversionRate;

  const handleContinuePress = () => {
    navigateByFlow();
  };

  const handleTapOpenPress = () => {
    setIsOpened(true);
  };

  return (
    <LinearGradientBackground>
      {isOpened ? (
        <GiftBoxOpened
          isRewardDollar={isRewardDollar}
          rewardAmount={isRewardDollar ? rewardAmount : rewardAmountInMe}
          handleContinuePress={handleContinuePress}
        />
      ) : (
        <GiftBoxReady onPress={handleTapOpenPress} />
      )}
    </LinearGradientBackground>
  );
};

export default SignUpRewardScreen;
