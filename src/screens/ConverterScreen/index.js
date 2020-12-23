import React, {useState, useCallback} from 'react';
import {FormattedMessage} from 'react-intl';
import {View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import {Formik} from 'formik';
import {useTheme} from 'emotion-theming';
import {GET_CONVERSION_RATE_API, CURRENCY_CONVERT_API} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';

import {detailStyle, container} from './style';

import HeaderTitle from '@/components/HeaderTitle';
import AppText from '@/components/AppText2';
import ConvertForm from './ConvertForm';

const ConverterScreen = ({navigation, route}) => {
  const theme = useTheme();
  const {initialFrom, initialTo} = route.params;
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);

  const handleChangeConvertCurrency = useCallback(() => {
    setFrom(to);
    setTo(from);
  }, [to, from]);

  const [convert] = useMutationWithAuth(CURRENCY_CONVERT_API);
  const {data} = useQueryWithAuth(GET_CONVERSION_RATE_API, {
    skip: !from || !to,
    variables: {from: from, to: to},
    fetchPolicy: 'network-only',
  });

  const conversionRate = data?.conversionRate || 0;

  const handleConvertPress = async (values) => {
    try {
      const result = await convert({
        variables: {
          from: from,
          to: to,
          amount: values.amount,
        },
      });

      if (result) {
        navigation.pop();
      }
    } catch (e) {
      console.error(
        `Error in convert currency from ${values.from} to ${values.to} with amount ${values.amount}`,
        e,
      );
    }
  };

  const validate = (values) => {
    const errors = {};
    if (Number(values.amount) <= 0) {
      errors.amount = (
        <FormattedMessage
          id="amount_cannot_be_zero"
          defaultMessage="Amount cannot be zero"
        />
      );
    }

    // TODO: handle if amount is not enough / return meaningful error from backend
    // errors.amount = 'Do not have enough amount'

    return errors;
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : ''}>
        <HeaderTitle>
          <FormattedMessage id="converter" defaultMessage="Converter" />
        </HeaderTitle>
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
            }}
            onSubmit={handleConvertPress}
            validate={validate}>
            <ConvertForm
              conversionRate={conversionRate}
              changeConvertCurrency={handleChangeConvertCurrency}
              from={from}
              to={to}
            />
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ConverterScreen;
