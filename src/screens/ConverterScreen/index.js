import React from 'react';
import {FormattedMessage} from 'react-intl';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {useTheme} from 'emotion-theming';
import {GET_CONVERSION_RATE_API, CURRENCY_CONVERT_API} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';

import {detailStyle, container} from './style';

import ModalContainer from '@/components/ModalContainer';
import AppText from '@/components/AppText2';
import ConvertForm from './ConvertForm';

const ConverterScreen = ({navigation, route}) => {
  const theme = useTheme();
  const from = route.params.from;
  const to = route.params.to;
  const [convert] = useMutationWithAuth(CURRENCY_CONVERT_API);
  const {data} = useQueryWithAuth(GET_CONVERSION_RATE_API, {
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
          <View style={container}>
            <AppText variant="body1" style={detailStyle(theme)}>
              <FormattedMessage
                id="converter_detail"
                defaultMessage="converter_detail"
              />
            </AppText>
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
          </View>
        </ModalContainer>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ConverterScreen;
