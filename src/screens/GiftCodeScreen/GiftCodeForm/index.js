import React from 'react';
import {View, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {FormattedMessage} from 'react-intl';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import {container, formView, detail} from './style';
import Input from '@/components/AppInput';
import {Formik} from 'formik';
import AppKeyboardAvoidingView from '@/components/AppKeyboardAvoidingView';
import {useTheme} from 'emotion-theming';

const GiftCodeForm = ({onSubmitPress}) => {
  const theme = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <AppKeyboardAvoidingView
        style={container}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <Formik
          initialValues={{
            redeemCode: '',
          }}
          onSubmit={onSubmitPress}>
          {({handleSubmit, isValid}) => (
            <View style={formView(theme)}>
              <View>
                <Input
                  name="redeemCode"
                  autoFocus
                  colorVariant="primary"
                  label={
                    <FormattedMessage
                      id="enter_gift_code"
                      defaultMessage="Enter Gift Code"
                    />
                  }
                />
              </View>
              <View>
                <AppButton
                  onPress={handleSubmit}
                  text={
                    <FormattedMessage
                      id="button.submit"
                      defaultMessage="Submit"
                    />
                  }
                  disabled={!isValid}
                  variant="filled"
                  sizeVariant="large"
                  colorVariant="primary"
                />
                <AppText variant="body2" style={detail(theme)}>
                  <FormattedMessage
                    id="mdt_gift_codes_rights"
                    defaultMessage="MDT gift codes are given out at specific events. Measurable Foundation Ltd. reserves all rights."
                  />
                </AppText>
              </View>
            </View>
          )}
        </Formik>
      </AppKeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default GiftCodeForm;
