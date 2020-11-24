import React, {useRef, useEffect, useState, useContext} from 'react';
import {Animated} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {AuthContext} from '@/context/auth';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import MDTGiftBox from '@/components/MDTGiftBox';
import AppButton from '@/components/AppButton';
import useSetupFlow from '@/hooks/useSetupFlow';
import {REWARD_DOLLAR} from '@/constants/currency';

import {
  Container,
  TouchableContainer,
  OpenText,
  GotRewardText,
  YouGotRewardAmountText,
  GiftIcon,
  SmallCoin,
  RewardAmount,
  TextContainer,
  ContinueButton,
  buttonContainer,
} from './style';

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
  return (
    <Container>
      <GotRewardText>
        <FormattedMessage
          id="got_sign_up_reward"
          default="You got a sign-up reward"
        />
      </GotRewardText>
      <AnimatedFloat>
        <GiftIcon source={require('@/assets/icon_gift.png')} />
      </AnimatedFloat>
      <AnimatedText>
        <TouchableContainer activeOpacity={1} onPress={() => setIsOpened(true)}>
          <OpenText>
            <FormattedMessage id="tap_to_open" default="Tap to open" />
          </OpenText>
        </TouchableContainer>
      </AnimatedText>
    </Container>
  );
};

const GiftBoxOpened = ({rewardAmount}) => {
  const {cashBackType} = useContext(AuthContext);
  const coinIconSource =
    cashBackType === REWARD_DOLLAR
      ? require('@/assets/coin.png')
      : require('@/assets/mdt_coin.png');

  return (
    <Container>
      <MDTGiftBox />
      <TextContainer>
        <YouGotRewardAmountText>
          <FormattedMessage id="you_got" default="You got" />
        </YouGotRewardAmountText>
        <SmallCoin source={coinIconSource} />
        <RewardAmount>{rewardAmount}</RewardAmount>
      </TextContainer>
    </Container>
  );
};

const SignUpRewardScreen = ({route}) => {
  const [isOpened, setIsOpened] = useState(false);
  const {navigateByFlow} = useSetupFlow();
  const accountSetupReward = route?.params?.accountSetupReward;
  const rewardAmount = accountSetupReward?.value || 0;
  const handleContinuePress = () => {
    navigateByFlow();
  };

  return (
    <LinearGradientBackground colors={['#FDFBF2', '#E2FAFF']}>
      <Container>
        {isOpened ? (
          <GiftBoxOpened rewardAmount={rewardAmount} />
        ) : (
          <GiftBoxReady setIsOpened={setIsOpened} />
        )}
      </Container>
      <ContinueButton>
        {isOpened && (
          <AppButton
            onPress={handleContinuePress}
            text={<FormattedMessage id="button.continue" default="continue" />}
            variant="filled"
            sizeVariant="large"
            colorVariant="secondary"
            style={buttonContainer}
          />
        )}
      </ContinueButton>
    </LinearGradientBackground>
  );
};

export default SignUpRewardScreen;
