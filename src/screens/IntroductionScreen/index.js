import React from 'react';
import {FormattedMessage} from 'react-intl';

import {
  ScrollContainer,
  Container,
  BackgroundImage,
  Title,
  Detail,
} from './style';

import BindingButton from './BindingButton';
import ThemeButton from '@/components/ThemeButton';
import BindingEmailIcon from '@/assets/binding-email.svg';
import BindingBankAccountIcon from '@/assets/binding-bank-account.svg';

const IntroductionScreen = ({route, navigation}) => {
  return (
    <ScrollContainer>
      <Container>
        <BackgroundImage source={require('@/assets/introduce_1.png')} />
        <Title>Select which way to retrieve your shopping records</Title>
        <Detail>
          RewardMe needs your shopping transaction records in order to give your
          cash back.
        </Detail>
        <BindingButton
          icon={<BindingEmailIcon />}
          title="Connect with Emails"
          caption="Powered by MailTime"
          onPress={() => navigation.navigate('bind_email')}
        />
        <BindingButton
          icon={<BindingBankAccountIcon />}
          title="Link Credit/Debit Cards"
          caption="Powered by Plaid and CrediGO"
          onPress={() => navigation.navigate('choose_region')}
        />
        <ThemeButton
          reverseBorder
          width="100%"
          onPress={() => navigation.navigate(route.params.skip)}>
          <FormattedMessage id="skip_for_now" defaultMessage="Skip for now" />
        </ThemeButton>
      </Container>
    </ScrollContainer>
  );
};

export default IntroductionScreen;
