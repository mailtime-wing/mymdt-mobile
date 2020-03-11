import React, {useState} from 'react';
import {Text, TouchableOpacity, Alert} from 'react-native';
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
  const data = route.params;
  const [emails, setEmails] = useState(['']);

  console.log('data', data);

  const onPressAddEmailAccount = email => {
    setEmails([
      ...emails,
      {
        email: email,
      },
    ]);
  };

  const bindEmailOnPressHandler = email => {
    Alert.alert('success bind email!');
  };

  const emailOnChangeHandler = (email, index) => {
    let newEmails = [...emails];
    newEmails[index] = email;
    setEmails(newEmails);
  };

  const onPressNextHandler = () => {
    navigation.navigate('loading');
  };

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
