import React from 'react';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import {
  ScrollContainer,
  Container,
  BackgroundImage,
  titleStyle,
  detailStyle,
  button,
} from './style';

import BindingButton from './BindingButton';
import useSetupFlow from '@/hooks/useSetupFlow';
import BindingEmailIcon from '@/assets/binding-email.svg';
import BindingBankAccountIcon from '@/assets/binding-bank-account.svg';
import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';

const IntroductionScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  return (
    <ScrollContainer>
      <Container>
        <BackgroundImage source={require('@/assets/introduce_1.png')} />
        <AppText variant="heading3" style={titleStyle(theme)}>
          <FormattedMessage
            id="select_way_to_retrieve_your_shopping_records"
            defaultMessage="Select which way to retrieve your shopping records"
          />
        </AppText>
        <AppText variant="body1" style={detailStyle(theme)}>
          <FormattedMessage
            id="reward_me_needs_your_transaction_records"
            defaultMessage="RewardMe needs your shopping transaction records in order to give your cash back."
          />
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
        <AppButton
          variant="outlined"
          sizeVariant="normal"
          colorVariant="contrast"
          text={
            <FormattedMessage
              id="button.skip_for_now"
              defaultMessage="Skip for now"
            />
          }
          onPress={() => navigateByFlow('skip')}
          style={button}
        />
      </Container>
    </ScrollContainer>
  );
};

export default IntroductionScreen;
