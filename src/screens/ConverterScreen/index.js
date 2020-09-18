import React, {useState, useEffect} from 'react';
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

const fromMrpToMdt = {
  from: MEASURABLE_REWARD_POINT,
  to: MEASURABLE_DATA_TOKEN,
};

const fromMdtToMrp = {
  from: MEASURABLE_DATA_TOKEN,
  to: MEASURABLE_REWARD_POINT,
};

const ConverterScreen = ({navigation, route}) => {
  const theme = useTheme();
  const {isMrp} = route.params;
  const [convertFromMrp, setConvertFromMrp] = useState(isMrp);
  const [convertVariables, setConvertVariables] = useState({});

  useEffect(() => {
    if (convertFromMrp) {
      setConvertVariables(fromMrpToMdt);
    } else {
      setConvertVariables(fromMdtToMrp);
    }
  }, [convertFromMrp]);

  const handleChangeConvertCurrency = () => {
    setConvertFromMrp(currency => !currency);
  };

  const [convert] = useMutationWithAuth(CURRENCY_CONVERT_API);
  const {data} = useQueryWithAuth(GET_CONVERSION_RATE_API, {
    skip: !convertVariables.from || !convertVariables.to,
    variables: convertVariables,
    fetchPolicy: 'network-only',
  });

  const conversionRate = data?.conversionRate || 0;

  const handleConvertPress = async values => {
    try {
      const result = await convert({
        variables: {
          ...convertVariables,
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
                convertVariables={convertVariables}
                convertFromMrp={convertFromMrp}
                changeConvertCurrency={handleChangeConvertCurrency}
              />
            </Formik>
          </View>
        </ModalContainer>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ConverterScreen;
