import React, {useState} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';
import {Formik, useFormikContext} from 'formik';

import {Container, Detail, DateFieldContainer, ScrollContainer} from './style';

import DateTimeSelector from '@/components/DateTimeSelector';

import ModalContainer from '@/components/ModalContainer';
import ThemeButton from '@/components/ThemeButton';
import Input from '@/components/AppInput';
import FormInput from '@/components/Input';

const Form = ({showDatePicker, handleDatePickerPress, changeDateFormat}) => {
  const {setFieldValue, values, handleSubmit, isValid} = useFormikContext();

  const handleDateChange = date => {
    setFieldValue('receiptDate', date);
  };

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
      <DateFieldContainer onPress={handleDatePickerPress}>
        <FormInput // use old input becoz of date format
          label={
            <FormattedMessage id="receipt_date" defaultMessage="Receipt Date" />
          }
          required
          value={changeDateFormat(values.receiptDate)}
          name="receiptDate"
          editable={false}
          placeholder="DD/MM/YYYY"
          pointerEvents="none"
        />
        {showDatePicker && (
          <DateTimeSelector
            date={values.receiptDate}
            onChange={handleDateChange}
          />
        )}
      </DateFieldContainer>
      <Input
        label={
          <FormattedMessage id="order_number" defaultMessage="Order Number" />
        }
        name="orderNumber"
      />
      <Input
        label={<FormattedMessage id="amount" defaultMessage="amount" />}
        name="amount"
        keyboardType="numeric"
      />
      <ThemeButton onPress={handleSubmit} title="Submit" disabled={!isValid}>
        <FormattedMessage id="submit" defaultMessage="submit" />
      </ThemeButton>
    </>
  );
};

const MissingReceiptScreen = () => {
  const intl = useIntl();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDatePickerPress = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleSpacePress = () => {
    Keyboard.dismiss();
    setShowDatePicker(false);
  };

  const handleSubmitPress = async values => {
    try {
      // TODO: integrate API
    } catch (e) {
      console.error('Error in updating user profile edit screen', e);
    }
    Keyboard.dismiss();
  };

  const changeDateFormat = isoDate => {
    return intl.formatDate(isoDate, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const initialValues = {
    email: '',
    receiptTitle: '',
    senderEmail: '',
    receiptDate: new Date(),
    orderNumber: '',
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
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={handleSpacePress}>
          <ModalContainer
            title={
              <FormattedMessage
                id="missing_receipt"
                defaultMessage="ProfileMissing Receipt"
              />
            }>
            <Container>
              <Detail>
                <FormattedMessage
                  id="missing_receipt_detail"
                  defaultMessage="Please provide the detail of the missing email receipt as much as possible."
                />
              </Detail>
              <Detail>* required</Detail>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={values => handleSubmitPress(values)}
                validate={values => validate(values)}>
                <Form
                  showDatePicker={showDatePicker}
                  handleDatePickerPress={handleDatePickerPress}
                  changeDateFormat={changeDateFormat}
                />
              </Formik>
            </Container>
          </ModalContainer>
        </TouchableWithoutFeedback>
      </ScrollContainer>
    </KeyboardAvoidingView>
  );
};

export default MissingReceiptScreen;
