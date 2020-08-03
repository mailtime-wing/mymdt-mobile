import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';
import {Formik, useFormikContext} from 'formik';

import {
  Container,
  RowContainer,
  RowHeader,
  RowHeaderContainer,
  RowValue,
  QuestionMark,
} from './style';

import ModalContainer from '@/components/ModalContainer';
import ThemeButton from '@/components/ThemeButton';
import Input from '@/components/AppInput';

const textAlignRight = {textAlign: 'right'};

const Form = () => {
  const intl = useIntl();
  const {values, handleSubmit, isValid} = useFormikContext();

  return (
    <>
      <Input
        label={<FormattedMessage id="address" defaultMessage="Address" />}
        name="address"
        keyboardType="email-address"
      />
      <Input
        label={<FormattedMessage id="amount" defaultMessage="amount" />}
        name="amount"
        keyboardType="numeric"
        remark={
          <FormattedMessage
            id="minimum_withdrawal"
            values={{
              amount: 500,
            }}
          />
        }
        textStyle={textAlignRight}
      />
      <RowContainer>
        <RowHeaderContainer>
          <RowHeader>
            <FormattedMessage
              id="transaction_fee"
              defaultMessage="Transaction Fee"
            />
          </RowHeader>
          <QuestionMark>
            <Image source={require('@/assets/icon_help_circle.png')} />
          </QuestionMark>
        </RowHeaderContainer>
        <RowValue>55.00 MDT</RowValue>
      </RowContainer>
      <RowContainer>
        <RowHeaderContainer>
          <RowHeader>
            <FormattedMessage id="final_amount" defaultMessage="Final Amount" />
          </RowHeader>
        </RowHeaderContainer>
        <RowValue>- MDT</RowValue>
      </RowContainer>
      <Input
        label={<FormattedMessage id="note" defaultMessage="note" />}
        name="note"
        remark={
          <FormattedMessage
            id="number_of_characters"
            values={{
              length: values.note.length,
              limit: 140,
            }}
          />
        }
        remarkStyle={textAlignRight}
        placeholder={intl.formatMessage({
          id: 'optional',
          defaultMessage: intl.messages.optional,
        })}
      />
      <ThemeButton onPress={handleSubmit} title="Submit" disabled={!isValid}>
        <FormattedMessage id="withdraw" defaultMessage="withdraw" />
      </ThemeButton>
    </>
  );
};

const WithdrawalScreen = () => {
  const handleSpacePress = () => {
    Keyboard.dismiss();
  };

  const handleSubmitPress = async values => {
    try {
      // TODO: integrate API
    } catch (e) {
      console.error('Error in updating user profile edit screen', e);
    }
    Keyboard.dismiss();
  };

  const initialValues = {
    address: '',
    amount: 0,
    note: '',
  };

  const validate = values => {
    const errors = {};

    if (!values.address) {
      errors.address = <FormattedMessage id="required" defaultMessage="Required" />
    }

    if (!values.amount) {
      errors.amount = <FormattedMessage id="required" defaultMessage="Required" />
    }

    if (values.note.length > 140) {
      errors.note = 'more than 140 characters';
    }

    if (values.amount < 500) {
      errors.amount = 'at least 500';
    }

    return errors;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={handleSpacePress}>
          <ModalContainer
            title={
              <FormattedMessage
                id="withdraw_mdt"
                defaultMessage="Withdraw MDT"
              />
            }>
            <Container>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={handleSubmitPress}
                validate={validate}>
                <Form />
              </Formik>
            </Container>
          </ModalContainer>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default WithdrawalScreen;
