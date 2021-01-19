import React, {useLayoutEffect, useRef, useState, useEffect} from 'react';
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

const UpgradeScreen = ({navigation, route}) => {
  const theme = useTheme();
  const lottieRef = useRef();
  const level = route?.params?.level || 0;
  const [currentLevel, setCurrentLevel] = useState(level - 1);

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

  const backgroundFlashAnim = useRef(new Animated.Value(0)).current;
  const backgroundFlashBackgroundColor = backgroundFlashAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      theme.colors.linesBackground,
      theme.colors.background1,
      theme.colors.linesBackground,
    ],
  });
  const backgroundFlashZIndex = backgroundFlashAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-1, 2, -1],
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;
  const contentYAxis = moveAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -30, -20],
  });
  const cardYAxis = moveAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, height * -0.2, height * -0.16],
  });

  const cardScale = moveAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1.4, 1.25],
  });

  useEffect(() => {
    Animated.sequence([
      Animated.timing(backgroundFlashAnim, {
        toValue: 1,
        duration: backgroundFadeOutDuration,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
      {
        start: (onComplete) => {
          setCurrentLevel((_currentLevel) => _currentLevel + 1);
          onComplete({finished: true});
        },
      },
      Animated.timing(backgroundFlashAnim, {
        toValue: 2,
        duration: backgroundFadeInDuration,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
      {
        start: (onComplete) => {
          if (lottieRef.current) {
            lottieRef.current.play();
          }
          onComplete({finished: true});
        },
      },
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.sequence([
          Animated.timing(moveAnim, {
            toValue: 1,
            duration: moveUpDuration,
            useNativeDriver: true,
            easing: Easing.in,
          }),
          Animated.timing(moveAnim, {
            toValue: 2,
            useNativeDriver: true,
            easing: Easing.in,
          }),
        ]),
      ]),
    ]).start();
  }, [backgroundFlashAnim, fadeAnim, moveAnim]);

  return (
    <>
      <Animated.View
        style={[
          {
            opacity: backgroundFlashAnim,
            backgroundColor: backgroundFlashBackgroundColor,
            zIndex: backgroundFlashZIndex,
          },
          background,
        ]}
      />
      <LottieView
        ref={lottieRef}
        source={require('./firework_animation.json')}
        resizeMode="cover"
        style={firework}
      />
      <View style={container}>
        <Animated.View
          style={{
            transform: [{translateY: cardYAxis}, {scale: cardScale}],
          }}>
          <MembershipCard userLevel={currentLevel} />
        </Animated.View>
        <View style={congratsContainer}>
          <Animated.View style={{opacity: fadeAnim}}>
            <Animated.View
              style={{
                transform: [{translateY: contentYAxis}],
              }}>
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
            </Animated.View>
            <AppButton
              variant="filled"
              sizeVariant="large"
              colorVariant="secondary"
              text={<FormattedMessage id="button.continue" />}
              style={button}
              onPress={() => navigation.pop()}
            />
          </Animated.View>
        </View>
      </View>
    </>
  );
};

export default UpgradeScreen;
