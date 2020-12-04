import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import {
  container,
  bodyContainer,
  inner,
  backgroundImage,
  titleStyle,
  detailStyle,
  button,
  scale,
} from './style';

import BindingButton from './BindingButton';
import useSetupFlow from '@/hooks/useSetupFlow';
import EmailIcon from '@/assets/icon_mail.svg';
import CreditCardIcon from '@/assets/icon_credit-card.svg';
import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import AppKeyboardAvoidingView from '@/components/AppKeyboardAvoidingView';
import ScreenContainer from '@/components/ScreenContainer';

const {width} = Dimensions.get('window');
const scaleDown = width < 414;

const IntroductionScreen = () => {
  const theme = useTheme();
  const {navigateByFlow} = useSetupFlow();
  return (
    <AppKeyboardAvoidingView style={container(theme)} behavior="padding">
      <View style={inner}>
        <ScreenContainer>
          <View style={bodyContainer}>
            <Image
              source={require('@/assets/introduce_1.png')}
              style={[backgroundImage, scaleDown && scale]}
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
              onPress={() => navigateByFlow('email_flow')}
            />
            <BindingButton
              icon={CreditCardIcon}
              title="Link Credit/Debit Cards"
              caption="Powered by Plaid and CrediGO"
              onPress={() => navigateByFlow('card_flow')}
            />
          </View>
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
        </ScreenContainer>
      </View>
    </AppKeyboardAvoidingView>
  );
};

export default IntroductionScreen;
