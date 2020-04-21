import React, {useState, useContext} from 'react';
import {Text, TouchableOpacity, Alert} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import {REGISTER_API} from '@/api/auth';
import {IntlContext} from '@/context/Intl';
import {FormattedMessage} from 'react-intl';
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
  const {localeEnum} = useContext(IntlContext);
  const [emails, setEmails] = useState(['']);
  const [registerRequest, {loading, error}] = useMutation(REGISTER_API);

  const onPressAddEmailAccount = email => {
    setEmails([
      ...emails,
      {
        email: email,
      },
    ]);
  };

  const handleBindEmailPress = () => {
    Alert.alert('success bind email!');
  };

  const handleEmailOnChange = (email, index) => {
    let newEmails = [...emails];
    newEmails[index] = email;
    setEmails(newEmails);
  };

  const handleNextPress = async () => {
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
          locale: localeEnum,
        },
      });
      console.log('data', data);
      navigation.navigate('loading', {authToken: data.register.accessToken});
    } catch (e) {
      console.error('error in handleNextPress: ', e);
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
            onChangeText={text => handleEmailOnChange(text, index)}
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

          <Button small onPress={() => handleBindEmailPress(email)}>
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
      <Button onPress={handleNextPress}>
        <FormattedMessage id="next" />
      </Button>
      <Skip onPress={handleNextPress}>
        <FormattedMessage id="skip_for_now" />
      </Skip>
    </Container>
  );
};

export default BindEmailScreen;
