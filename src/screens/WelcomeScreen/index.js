import React, {useRef, useEffect} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import MembershipCard from '@/components/MembershipCard';
import membershipLevel from '@/enum/membershipLevel';
import useSetupFlow from '@/hooks/useSetupFlow';

import {welcome, container, contentContaienr} from './style';

const FadeInView = ({children}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
      }).start();
    };
    fadeIn();
  }, [fadeAnim]);
  return <Animated.View style={{opacity: fadeAnim}}>{children}</Animated.View>;
};

const WelcomeScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  return (
    <TouchableOpacity style={container} onPress={() => navigateByFlow()}>
      <View style={contentContaienr}>
        <FadeInView>
          <MembershipCard userLevel={membershipLevel.STARTER} />
        </FadeInView>
        <FadeInView>
          <AppText variant="heading2" style={welcome(theme)}>
            <FormattedMessage
              id="welcome_to_reward_me"
              defaultMessage="Welcome to RewardMe"
            />
          </AppText>
        </FadeInView>
      </View>
    </TouchableOpacity>
  );
};

export default WelcomeScreen;
