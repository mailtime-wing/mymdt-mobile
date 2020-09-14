import React, {useContext} from 'react';
import {FormattedMessage} from 'react-intl';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {AuthContext} from '@/context/auth';
import {useQuery, useMutation} from '@apollo/client';
import {GET_CONVERSION_RATE_API, CURRENCY_CONVERT_API} from '@/api/data';

import {Container, Detail} from './style';

import ModalContainer from '@/components/ModalContainer';
import ConvertForm from './ConvertForm';

const ConverterScreen = ({navigation, route}) => {
  const from = route.params.from;
  const to = route.params.to;
  const {authToken} = useContext(AuthContext);
  const [convert] = useMutation(CURRENCY_CONVERT_API);
  const {data} = useQuery(GET_CONVERSION_RATE_API, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
    variables: {
      from: from,
      to: to,
    },
  });

  const conversionRate = data?.conversionRate || 0;

  const handleConvertPress = async values => {
    try {
      const result = await convert({
        variables: {
          from: values.from,
          to: values.to,
          amount: values.amount,
        },
        context: {
          headers: {
            authorization: authToken ? `Bearer ${authToken}` : '',
          },
        },
      });

      if (result) {
        navigation.pop();
      }
    } catch (e) {
      console.error(
        `Error in convert currency from ${values.from} to ${
          values.to
        } with amount ${values.amount}`,
        e,
      );
    }
  };

  const validate = values => {
    const errors = {};
    if (values.amount <= 0) {
      errors.amount = 'must more than 0';
    }
    // TODO: handle if amount is not enough / return meaningful error from backend
    // errors.amount = 'Do not have enough amount'

    return errors;
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView behavior="position">
        <ModalContainer
          title={
            <FormattedMessage id="converter" defaultMessage="Converter" />
          }>
          <Container>
            <Detail>
              <FormattedMessage
                id="converter_detail"
                defaultMessage="converter_detail"
              />
            </Detail>
            <Formik
              initialValues={{
                amount: 0,
                from: from,
                to: to,
              }}
              onSubmit={handleConvertPress}
              validate={validate}>
              <ConvertForm conversionRate={conversionRate} from={from} />
            </Formik>
          </Container>
        </ModalContainer>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ConverterScreen;
