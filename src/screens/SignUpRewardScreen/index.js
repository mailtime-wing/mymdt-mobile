import React, {useRef, useEffect, useState, useContext} from 'react';
import {Animated, Easing} from 'react-native';
import {withAnchorPoint} from 'react-native-anchor-point';
import {FormattedMessage} from 'react-intl';
import {
  Container,
  TouchableContainer,
  OpenText,
  GotRewardText,
  YouGotRewardAmountText,
  GiftIcon,
  SmallCoin,
  BoxBody,
  Circle,
  AnimatedView,
  RewardAmount,
  TextContainer,
  styles,
  ContinueButton,
} from './style';
import {AuthContext, MEASURABLE_REWARD_POINT} from '@/context/auth';

import LinearGradientBackground from '@/components/LinearGradientBackground';
import ThemeButton from '@/components/ThemeButton';

const AnimatedText = props => {
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

const AnimatedFloat = props => {
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

const AnimatedBox = props => {
  const rotateAnim = new Animated.Value(0);

  Animated.sequence([
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]).start();

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '103deg'],
  });

  const getTransform = () => {
    let transform = {
      transform: [{perspective: 400}, {rotate: rotate}],
    };
    return withAnchorPoint(transform, {x: 1, y: 1}, {width: 127, height: 54});
  };

  return (
    <Animated.Image
      style={[styles.animatedBoxHead, getTransform()]}
      {...props}
    />
  );
};

const AnimatedMove = props => {
  const moveAnim = new Animated.Value(0);

  Animated.timing(moveAnim, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  }).start();

  const xAxis = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [150 - props.width / 2, props.destX],
  });

  const yAxis = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50 + props.height / 2, props.destY],
  });

  const scale = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  });

  const rotate = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', props.deg || '0deg'],
  });

  return (
    <AnimatedView
      style={[
        styles.animatedView,
        props.enableShadow && styles.animatedViewShadow,
        props.longShadow && styles.animatedViewShadowLong,
      ]}>
      <Animated.Image
        style={{
          width: props.width,
          height: props.height,
          transform: [
            {translateX: xAxis},
            {translateY: yAxis},
            {scale: scale},
            {rotate: rotate},
          ],
        }}
        {...props}
      />
    </AnimatedView>
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
    cashBackType === MEASURABLE_REWARD_POINT
      ? require('@/assets/coin.png')
      : require('@/assets/mdt_coin.png');

  return (
    <Container>
      <Circle>
        <AnimatedMove
          width={24}
          height={24}
          deg="45deg"
          destX={253}
          destY={-196}
          source={require('@/assets/star.png')}
        />
        <AnimatedMove
          width={42}
          height={42}
          deg="15deg"
          destX={16}
          destY={-99}
          source={require('@/assets/star.png')}
        />
        <AnimatedMove
          width={80}
          height={80}
          destX={201}
          destY={-239}
          source={require('@/assets/star.png')}
        />
        <AnimatedMove
          width={150}
          height={160}
          deg="-8deg"
          destX={26}
          destY={-153}
          source={coinIconSource}
          enableShadow
          longShadow
        />
        <AnimatedMove
          width={60}
          height={64}
          deg="10deg"
          destX={147}
          destY={-91}
          source={coinIconSource}
          enableShadow
        />
        <AnimatedBox source={require('@/assets/gift_box_head.png')} />
        <BoxBody source={require('@/assets/gift_box_body.png')} />
        {/* TODO: Fix the BoxBody is not under the circle */}
      </Circle>
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

const SignUpRewardScreen = ({route, navigation}) => {
  const [isOpened, setIsOpened] = useState(false);
  const {accountSetupReward} = route.params;
  const rewardAmount = accountSetupReward?.value || 0;
  const handleContinuePress = () => {
    navigation.navigate(route.params.next);
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
          <ThemeButton onPress={handleContinuePress} width="90%">
            <FormattedMessage id="continue" default="continue" />
          </ThemeButton>
        )}
      </ContinueButton>
    </LinearGradientBackground>
  );
};

export default SignUpRewardScreen;
