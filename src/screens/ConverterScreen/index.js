import React, {useContext} from 'react';
import {FormattedMessage} from 'react-intl';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {AuthContext} from '@/context/auth';
import {useQuery} from '@apollo/react-hooks';
import {GET_CONVERSION_RATE_API} from '@/api/data';

import {Container, Detail} from './style';

import ModalContainer from '@/components/ModalContainer';
import ConvertForm from './ConvertForm';

const ConverterScreen = ({route}) => {
  const from = route.params.from;
  const to = route.params.to;
  const {authToken} = useContext(AuthContext);
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
    // TODO: integrate convert api
    console.log(values);
  };

  const validate = values => {
    const errors = {};
    // TODO: handle when integrate convert api

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
