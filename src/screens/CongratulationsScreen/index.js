import React, {useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import MembershipCard from '@/components/MembershipCard';
import membershipLevel from '@/enum/membershipLevel';
import useSetupFlow from '@/hooks/useSetupFlow';

import {
  congrats,
  earnedReward,
  container,
  contentContaienr,
  button,
} from './style';

const FadeInView = ({children}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    };
    fadeIn();
  }, [fadeAnim]);
  return <Animated.View style={{opacity: fadeAnim}}>{children}</Animated.View>;
};

const CongratulationsScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  return (
    <View style={container}>
      <View style={contentContaienr}>
        <FadeInView>
          <MembershipCard userLevel={membershipLevel.STARTER} />
        </FadeInView>
        <FadeInView>
          <AppText variant="heading2" style={congrats(theme)}>
            <FormattedMessage
              id="congratulations"
              defaultMessage="Congratulations!"
            />
          </AppText>
          <AppText variant="heading4" style={earnedReward(theme)}>
            <FormattedMessage
              id="you_earned_first_reward"
              defaultMessage="You Just Earned Your First Reward!"
            />
          </AppText>
        </FadeInView>

        <AppButton
          onPress={() => navigateByFlow()}
          text={
            <FormattedMessage
              id="button.choose_cashback_type"
              defaultMessage="Choose Cash Back Type"
            />
          }
          variant="filled"
          sizeVariant="normal"
          colorVariant="secondary"
          style={button}
        />
      </View>
    </View>
  );
};

export default CongratulationsScreen;
