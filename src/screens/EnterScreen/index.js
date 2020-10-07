import React from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import LoginForm from '@/components/LoginForm';
import ScreenContainer from '@/components/ScreenContainer';

const EnterScreen = ({navigation}) => {
  const handleSubmitPress = async (values) => {
    const completePhoneNumber = values.phonePrefix + values.phone;
    try {
      navigation.navigate('verify_enter', {phoneNubmer: completePhoneNumber});
    } catch (e) {}
  };

  return (
    <ScrollView>
      <ScreenContainer hasTopBar>
        <LoginForm
          title={<FormattedMessage id="welcome_to_reward_me" />}
          description={
            <FormattedMessage id="setting_up_agree_terms_and_policy" />
          }
          submitButtonText={
            <FormattedMessage
              id="button.send_verification_code"
              defaultMessage="send verification code"
            />
          }
          onSubmit={handleSubmitPress}
        />
      </ScreenContainer>
    </ScrollView>
  );
};

export default EnterScreen;
