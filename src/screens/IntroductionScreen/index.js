import React from 'react';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import {
  ScrollContainer,
  Container,
  BackgroundImage,
  titleStyle,
  detailStyle,
} from './style';

import BindingButton from './BindingButton';
import ThemeButton from '@/components/ThemeButton';
import useSetupFlow from '@/hooks/useSetupFlow';
import BindingEmailIcon from '@/assets/binding-email.svg';
import BindingBankAccountIcon from '@/assets/binding-bank-account.svg';
import AppText from '@/components/AppText2';

const IntroductionScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  return (
    <ScrollContainer>
      <Container>
        <BackgroundImage source={require('@/assets/introduce_1.png')} />
        <AppText variant="heading3" style={titleStyle(theme)}>
          Select which way to retrieve your shopping records
        </AppText>
        <AppText variant="body1" style={detailStyle(theme)}>
          RewardMe needs your shopping transaction records in order to give your
          cash back.
        </AppText>
        <BindingButton
          icon={<BindingEmailIcon />}
          title="Connect with Emails"
          caption="Powered by MailTime"
          onPress={() => navigateByFlow('email_flow')}
        />
        <BindingButton
          icon={<BindingBankAccountIcon />}
          title="Link Credit/Debit Cards"
          caption="Powered by Plaid and CrediGO"
          onPress={() => navigateByFlow('card_flow')}
        />
        <ThemeButton
          reverseBorder
          width="100%"
          onPress={() => navigateByFlow('skip')}>
          <FormattedMessage id="skip_for_now" defaultMessage="Skip for now" />
        </ThemeButton>
      </Container>
    </ScrollContainer>
  );
};

export default IntroductionScreen;
