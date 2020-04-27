import React from 'react';
import {FormattedMessage} from 'react-intl';

import ThemeButton from '@/components/ThemeButton';

import {Container, Title, Detail, MarginContainer} from './style';

const AccountSetupDoneScreen = ({navigation}) => {
  const handleBindEmailsPress = () => {
    navigation.navigate('bind_email');
  };

  const handleSkipPress = () => {
    navigation.navigate('notification');
  };

  return (
    <Container>
      <Title>
        <FormattedMessage id="success" defaultMessage="SUCCESS" />
      </Title>
      <Detail>
        <FormattedMessage
          id="let_your_cash_back"
          defaultMessage="Let’s bind your emails and start cash back"
        />
      </Detail>
      <ThemeButton onPress={handleBindEmailsPress}>
        <FormattedMessage
          id="bind_email_accounts"
          defaultMessage="Bind emails"
        />
      </ThemeButton>
      <MarginContainer />
      <ThemeButton small reverse onPress={handleSkipPress}>
        <FormattedMessage id="skip_for_now" defaultMessage="Skip for now" />
      </ThemeButton>
    </Container>
  );
};

export default AccountSetupDoneScreen;
