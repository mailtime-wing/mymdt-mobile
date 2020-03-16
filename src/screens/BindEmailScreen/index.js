import React, {useState, useContext} from 'react';
import {Text, TouchableOpacity, Alert} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import {REGISTER} from '@/api/auth';
import {FormattedMessage, useIntl} from 'react-intl';
import {AuthContext} from '@/context/auth';
import {
  Container,
  EmailContainer,
  Title,
  Detail,
  AddEmail,
  Skip,
} from './style';

import Input from '@/components/Input';
import Button from '@/components/Button';

const BindEmailScreen = ({route, navigation}) => {
  const {
    phone,
    verificationCode,
    name,
    gender,
    dob,
    selectedBrands,
    referralCode,
  } = route.params;
  const intl = useIntl();
  const {updateAuthToken} = useContext(AuthContext);
  const [emails, setEmails] = useState(['']);
  const [registerRequest, {loading, error}] = useMutation(REGISTER);

  const onPressAddEmailAccount = email => {
    setEmails([
      ...emails,
      {
        email: email,
      },
    ]);
  };

  const bindEmailOnPressHandler = () => {
    Alert.alert('success bind email!');
  };

  const emailOnChangeHandler = (email, index) => {
    let newEmails = [...emails];
    newEmails[index] = email;
    setEmails(newEmails);
  };

  const onPressNextHandler = async () => {
    try {
      const {data} = await registerRequest({
        variables: {
          phoneNumber: phone,
          otp: verificationCode,
          name: name,
          gender: gender,
          dateOfBirth: dob,
          subscribedBrandIds: selectedBrands.map(brand => brand.id),
          referalCode: referralCode,
          locale: intl.locale,
        },
      });
      updateAuthToken(data.register.accessToken);
      navigation.navigate('loading');
    } catch (e) {
      console.error('error in onPressNextHandler: ', e.message);
    }
  };

  if (loading) {
    return <Text>loading...</Text>;
  }
  if (error) {
    return <Text>register fail. {error.message}</Text>;
  }

  return (
    <Container>
      <Title>
        <FormattedMessage id="bind_email_accounts" />
      </Title>
      <Detail>
        <FormattedMessage id="dont_worry" />
      </Detail>

      {emails.map((email, index) => (
        <EmailContainer>
          <Input
            type="email"
            onChangeText={text => emailOnChangeHandler(text, index)}
            value={email}
            label={
              <FormattedMessage
                id="email_account"
                defaultMessage="EMAIL ACCOUNT {email_count}"
                values={{
                  email_count: index + 1,
                }}
              />
            }
          />

          <Button small onPress={() => bindEmailOnPressHandler(email)}>
            <Text>
              <FormattedMessage id="login" />
            </Text>
          </Button>
        </EmailContainer>
      ))}
      <TouchableOpacity onPress={() => onPressAddEmailAccount()}>
        <AddEmail>
          <FormattedMessage id="add_email_account" />
        </AddEmail>
      </TouchableOpacity>
      <Button onPress={onPressNextHandler}>
        <FormattedMessage id="next" />
      </Button>
      <Skip onPress={onPressNextHandler}>
        <FormattedMessage id="skip_for_now" />
      </Skip>
    </Container>
  );
};

export default BindEmailScreen;
