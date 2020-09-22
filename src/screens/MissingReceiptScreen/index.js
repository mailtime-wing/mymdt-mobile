import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {Formik, useFormikContext} from 'formik';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {REPORT_MISSING_RECEIPT} from '@/api/data';
import {useTheme} from 'emotion-theming';

import {
  detailStyle,
  dateContainer,
  container,
  amountCurrencyContainer,
  currencyContainer,
  amountContainer,
} from './style';

import ModalContainer from '@/components/ModalContainer';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import Input from '@/components/AppInput';
import DateTimePickerInput from '@/components/DateTimePickerInput';

const Form = ({showDatePicker, handleDatePickerPress}) => {
  const {handleSubmit, isValid} = useFormikContext();

  return (
    <>
      <Input
        label={<FormattedMessage id="email" defaultMessage="Email" />}
        required
        name="email"
        keyboardType="email-address"
      />
      <Input
        label={
          <FormattedMessage id="receipt_title" defaultMessage="Receipt Ttile" />
        }
        required
        name="receiptTitle"
      />
      <Input
        label={
          <FormattedMessage
            id="sender_email"
            defaultMessage="Sender’s email address"
          />
        }
        required
        name="senderEmail"
        keyboardType="email-address"
      />
      <DateTimePickerInput
        onPress={handleDatePickerPress}
        style={dateContainer}
        label={
          <FormattedMessage id="receipt_date" defaultMessage="Receipt Date" />
        }
        required
        name="receiptDate"
        showDatePicker={showDatePicker}
        onDismiss={handleDatePickerPress}
      />
      <Input
        label={
          <FormattedMessage id="order_number" defaultMessage="Order Number" />
        }
        name="orderNumber"
      />
      <View style={amountCurrencyContainer}>
        <View style={currencyContainer}>
          <Input
            label={<FormattedMessage id="amount" defaultMessage="amount" />}
            name="currencyCode"
          />
        </View>
        <View style={amountContainer}>
          <Input name="amount" keyboardType="numeric" />
        </View>
      </View>
      <AppButton
        onPress={handleSubmit}
        title="Submit"
        disabled={!isValid}
        text={<FormattedMessage id="submit" defaultMessage="submit" />}
        variant="filled"
        sizeVariant="large"
        colorVariant="secondary"
      />
    </>
  );
};

const MissingReceiptScreen = ({navigation}) => {
  const theme = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reportMissingReceipt] = useMutationWithAuth(REPORT_MISSING_RECEIPT);

  const handleDatePickerPress = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleSpacePress = () => {
    Keyboard.dismiss();
    setShowDatePicker(false);
  };

  const handleSubmitPress = async values => {
    try {
      await reportMissingReceipt({
        variables: {
          recipient: values.email,
          subject: values.receiptTitle,
          sender: values.senderEmail,
          emailDate: values.receiptDate,
          orderNumber: values.orderNumber,
          currencyCode: values.currencyCode,
          amount: values.amount,
        },
      });

      navigation.pop();
    } catch (e) {
      console.error('Error in updating user profile edit screen', e);
    }
    Keyboard.dismiss();
  };

  const initialValues = {
    email: '',
    receiptTitle: '',
    senderEmail: '',
    receiptDate: new Date(),
    orderNumber: '',
    currencyCode: 'HKD',
    amount: '',
  };

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = (
        <FormattedMessage id="required" defaultMessage="Required" />
      );
    }

    if (!values.receiptTitle) {
      errors.receiptTitle = (
        <FormattedMessage id="required" defaultMessage="Required" />
      );
    }

    if (!values.senderEmail) {
      errors.senderEmail = (
        <FormattedMessage id="required" defaultMessage="Required" />
      );
    }

    if (!values.receiptDate) {
      errors.receiptDate = (
        <FormattedMessage id="required" defaultMessage="Required" />
      );
    }

    return errors;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={handleSpacePress}>
          <ModalContainer
            title={
              <FormattedMessage
                id="missing_receipt"
                defaultMessage="ProfileMissing Receipt"
              />
            }>
            <View style={container}>
              <AppText variant="body1" style={detailStyle(theme)}>
                <FormattedMessage
                  id="missing_receipt_detail"
                  defaultMessage="Please provide the detail of the missing email receipt as much as possible."
                />
              </AppText>
              <AppText variant="body1" style={detailStyle(theme)}>
                * required
              </AppText>
              <Formik
                initialValues={initialValues}
                onSubmit={values => handleSubmitPress(values)}
                validate={values => validate(values)}>
                <Form
                  showDatePicker={showDatePicker}
                  handleDatePickerPress={handleDatePickerPress}
                />
              </Formik>
            </View>
          </ModalContainer>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MissingReceiptScreen;
