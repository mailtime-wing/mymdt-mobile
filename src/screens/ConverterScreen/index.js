import React, {useState, useCallback} from 'react';
import {FormattedMessage} from 'react-intl';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {useTheme} from 'emotion-theming';
import {GET_CONVERSION_RATE_API, CURRENCY_CONVERT_API} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {
  MEASURABLE_REWARD_POINT,
  MEASURABLE_DATA_TOKEN,
} from '@/constants/currency';

import {detailStyle, container} from './style';

import ModalContainer from '@/components/ModalContainer';
import AppText from '@/components/AppText2';
import ConvertForm from './ConvertForm';

const ConverterScreen = ({navigation, route}) => {
  const theme = useTheme();
  const {initialFrom, initialTo} = route.params;
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const isConvertFromMrpToMdt =
    from === MEASURABLE_REWARD_POINT && to === MEASURABLE_DATA_TOKEN;
  const isConvertFromMdtToMrp =
    from === MEASURABLE_DATA_TOKEN && to === MEASURABLE_REWARD_POINT;

  const handleChangeConvertCurrency = useCallback(() => {
    if (isConvertFromMrpToMdt) {
      setFrom(MEASURABLE_DATA_TOKEN);
      setTo(MEASURABLE_REWARD_POINT);
    }

    if (isConvertFromMdtToMrp) {
      setFrom(MEASURABLE_REWARD_POINT);
      setTo(MEASURABLE_DATA_TOKEN);
    }
  }, [isConvertFromMrpToMdt, isConvertFromMdtToMrp]);

  const [convert] = useMutationWithAuth(CURRENCY_CONVERT_API);
  const {data} = useQueryWithAuth(GET_CONVERSION_RATE_API, {
    skip: !from || !to,
    variables: {from: from, to: to},
    fetchPolicy: 'network-only',
  });

  const conversionRate = data?.conversionRate || 0;

  const handleConvertPress = async values => {
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
              }}
              onSubmit={handleConvertPress}
              validate={validate}>
              <ConvertForm
                conversionRate={conversionRate}
                changeConvertCurrency={handleChangeConvertCurrency}
                isConvertFromMrpToMdt={isConvertFromMrpToMdt}
                isConvertFromMdtToMrp={isConvertFromMdtToMrp}
                from={from}
                to={to}
              />
            </Formik>
          </View>
        </ModalContainer>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ConverterScreen;
