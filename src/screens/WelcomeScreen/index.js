import React from 'react';
import {FormattedMessage} from 'react-intl';
import AutoScrolling from 'react-native-auto-scrolling';

import {
  Container,
  Title,
  Detail,
  StartAndAgree,
  PaddingContainer,
  AppIconGridImageContainer,
  AppIconGridImage,
} from './style';

import ThemeButton from '@/components/ThemeButton';

const WelcomeScreen = ({navigation}) => {
  return (
    <Container>
      <Title>
        <FormattedMessage id="welcome" defaultMessage="Welcome!" />
      </Title>
      <Detail>
        <FormattedMessage
          id="welcome_detail"
          defaultMessage="RewardMe is a cashback app that let you earn points after online/offline shopping, in-app purchase or subscribe to online services."
        />
      </Detail>
      <AppIconGridImageContainer>
        <AutoScrolling endPaddingWidth={8} duration={20000}>
          <AppIconGridImage source={require('@/assets/app_icon_grid.png')} />
        </AutoScrolling>
      </AppIconGridImageContainer>
      <PaddingContainer>
        <ThemeButton onPress={() => navigation.navigate('offer_select')}>
          <FormattedMessage id="start" defaultMessage="Start" />
        </ThemeButton>
      </PaddingContainer>
      <StartAndAgree>
        <FormattedMessage
          id="setting_up_agree_terms_and_policy"
          defaultMessage="By setting up the account, you agree with RewardMe’s Terms of Service and Privacy Policy."
        />
      </StartAndAgree>
    </Container>
  );
};

export default WelcomeScreen;
