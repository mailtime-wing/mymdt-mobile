import React from 'react';
import {View, Image} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import {bodyContainer, backgroundImage, titleStyle, detailStyle} from './style';

import BindingButton from './BindingButton';
import EmailIcon from '@/assets/icon_mail.svg';
import CreditCardIcon from '@/assets/icon_credit-card.svg';
import AppText from '@/components/AppText2';

const ChooseBindDataSource = ({onEmailChoose, onBankChoose}) => {
  const theme = useTheme();
  return (
    <View style={bodyContainer}>
      <Image
        source={require('@/assets/introduce_1.png')}
        style={backgroundImage}
        resizeMode="contain"
      />
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
        icon={EmailIcon}
        title="Connect with Emails"
        caption="Powered by MailTime"
        onPress={onEmailChoose}
      />
      <BindingButton
        icon={CreditCardIcon}
        title="Link Credit/Debit Cards"
        caption="Powered by Plaid and CrediGO"
        onPress={onBankChoose}
      />
    </View>
  );
};

export default ChooseBindDataSource;
