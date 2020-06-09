import React from 'react';
import {FormattedMessage} from 'react-intl';

import {
  ScrollContainer,
  Container,
  ButtonsContainer,
  BackgroundImage,
  Title,
  Detail,
} from './style';

import ThemeButton from '@/components/ThemeButton';

const IntroductionScreen = ({navigation}) => {
  return (
    <ScrollContainer>
      <Container>
        <BackgroundImage source={require('@/assets/introduce_1.png')} />
        <Title>We need shopping receipts to give you cash back</Title>
        <Detail>
          If you are worried about your privacy, we recommend you to bind the
          email inbox receiving shopping receipts only.
        </Detail>
        <ButtonsContainer>
          <ThemeButton
            reverseBorder
            width="38%"
            onPress={() => navigation.navigate('notification_permission')}>
            <FormattedMessage id="skip" defaultMessage="Skip" />
          </ThemeButton>
          <ThemeButton
            reverse
            width="58%"
            onPress={() => navigation.navigate('bind_email')}>
            <FormattedMessage
              id="bind_email_accounts"
              defaultMessage="Bind Emails"
            />
          </ThemeButton>
        </ButtonsContainer>
      </Container>
    </ScrollContainer>
  );
};

export default IntroductionScreen;
