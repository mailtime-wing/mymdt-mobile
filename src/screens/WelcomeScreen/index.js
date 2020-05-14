import React from 'react';
import {FormattedMessage} from 'react-intl';
import ThemeButton from '@/components/ThemeButton';

import {Container, Title, Detail, StartAndAgree} from './style';

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
      <ThemeButton onPress={() => navigation.navigate('brand_select')}>
        <FormattedMessage id="start" defaultMessage="Start" />
      </ThemeButton>
      <StartAndAgree>
        <FormattedMessage
          id="setting_up_agree_terms_and_policy"
          defaultMessage="By setting up the account, you agree with RewardMe’s Terms of Service and Privacy Policy."
        />
      </StartAndAgree>
    </Container>
  );
};

export default WelcomeScreen;
