import React, {useCallback, useLayoutEffect, useRef} from 'react';
import {Animated, View, Dimensions, Easing} from 'react-native';
import {FormattedMessage} from 'react-intl';

import AppText from '@/components/AppText2';
import {
  congrats,
  member,
  container,
  button,
  firework,
  background,
  congratsContainer,
} from './style';
import {useTheme} from 'emotion-theming';
import AppButton from '@/components/AppButton';
import MembershipCard from '@/components/MembershipCard';
import LottieView from 'lottie-react-native';

const {height} = Dimensions.get('window');
const backgroundFadeOutDuration = 2000;
const backgroundFadeInDuration = 1000;
const moveUpDuration = 300;
const moveDownDuration = 200;
const delayDuration = backgroundFadeOutDuration + backgroundFadeInDuration;

const AnimatedView = ({children, onFinish}) => {
  const theme = useTheme();
  const Anim = useRef(new Animated.Value(0)).current;

  const backgroundColor = Anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      theme.colors.linesBackground,
      theme.colors.background1,
      theme.colors.linesBackground,
    ],
  });

  const zIndex = Anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-1, 2, -1],
  });

  Animated.sequence([
    Animated.timing(Anim, {
      toValue: 1,
      duration: backgroundFadeOutDuration,
      useNativeDriver: false,
      easing: Easing.linear,
    }),
    Animated.timing(Anim, {
      toValue: 2,
      duration: backgroundFadeInDuration,
      useNativeDriver: false,
      easing: Easing.linear,
    }),
  ]).start(onFinish);

  return (
    <Animated.View
      style={[
        {
          opacity: Anim,
          backgroundColor: backgroundColor,
          zIndex: zIndex,
        },
        background,
      ]}>
      {children}
    </Animated.View>
  );
};

const AnimatedFadeIn = ({children}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    delay: delayDuration,
    useNativeDriver: true,
    easing: Easing.linear,
  }).start();
  return <Animated.View style={{opacity: fadeAnim}}>{children}</Animated.View>;
};

const AnimatedText = ({children}) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  Animated.sequence([
    Animated.timing(moveAnim, {
      toValue: 1,
      duration: moveUpDuration,
      delay: delayDuration,
      useNativeDriver: true,
      easing: Easing.in,
    }),
    Animated.timing(moveAnim, {
      toValue: 2,
      duration: moveDownDuration,
      useNativeDriver: true,
      easing: Easing.in,
    }),
  ]).start();

  const yAxis = moveAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -30, -20],
  });

  return (
    <Animated.View
      style={{
        transform: [{translateY: yAxis}],
      }}>
      {children}
    </Animated.View>
  );
};

const AnimatedCard = ({children}) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  Animated.sequence([
    Animated.timing(moveAnim, {
      toValue: 1,
      duration: moveUpDuration,
      delay: delayDuration,
      useNativeDriver: true,
      easing: Easing.in,
    }),
    Animated.timing(moveAnim, {
      toValue: 2,
      duration: moveDownDuration,
      useNativeDriver: true,
      easing: Easing.in,
    }),
  ]).start();

  const yAxis = moveAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, height * -0.2, height * -0.16],
  });

  const scale = moveAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1.4, 1.25],
  });

  return (
    <Animated.View
      style={{
        transform: [{translateY: yAxis}, {scale: scale}],
      }}>
      {children}
    </Animated.View>
  );
};

const UpgradeScreen = ({navigation, route}) => {
  const theme = useTheme();
  const lottieRef = useRef();
  const {level} = route.params || 0;
  const cardLevelRef = useRef(level - 1); // old level

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: {
        backgroundColor: theme.colors.linesBackground,
      },
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
        backgroundColor: theme.colors.linesBackground,
      },
    });
  }, [navigation, theme.colors.linesBackground]);

  const handleOnFinish = useCallback(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
    if (cardLevelRef.current) {
      cardLevelRef.current = level;
    }
  }, [level]);

  return (
    <>
      <AnimatedView onFinish={handleOnFinish} />
      <LottieView
        ref={lottieRef}
        source={require('./firework_animation.json')}
        resizeMode="cover"
        loop
        style={firework}>
        <View style={container}>
          <AnimatedCard>
            <MembershipCard userLevel={cardLevelRef.current} />
          </AnimatedCard>
          <View style={congratsContainer}>
            <AnimatedFadeIn>
              <AnimatedText>
                <AppText variant="heading2" style={congrats(theme)}>
                  <FormattedMessage
                    id="congratulations"
                    defaultMessage="Congratulations!"
                  />
                </AppText>
                <AppText variant="heading5" style={member(theme)}>
                  <FormattedMessage
                    id="you_are_next_level_member_now"
                    defaultMessage="You are {next_level} member now!"
                    values={{
                      next_level: (
                        <FormattedMessage id={`membership_level_${level}`} />
                      ),
                    }}
                  />
                </AppText>
              </AnimatedText>
              <AppButton
                variant="filled"
                sizeVariant="large"
                colorVariant="secondary"
                text={<FormattedMessage id="button.continue" />}
                style={button}
                onPress={() => navigation.pop()}
              />
            </AnimatedFadeIn>
          </View>
        </View>
      </LottieView>
    </>
  );
};

export default UpgradeScreen;
