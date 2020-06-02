import React, {useState} from 'react';
import {Alert} from 'react-native';
// import { useMutation } from '@apollo/react-hooks';
// import { BIND_EMAIL_ACCOUNTS } from '@/api/data';
import {FormattedMessage} from 'react-intl';
import {
  Container,
  EmailContainer,
  EmailRowContainer,
  Title,
  Detail,
  BindMoreLaterText,
  MarginContainer,
} from './style';

import Input from '@/components/Input';
import ThemeButton from '@/components/ThemeButton';

const BindEmailScreen = ({navigation}) => {
  const [emails, setEmails] = useState(['', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [bindEmailsRequest, { loading, error }] = useMutation(BIND_EMAIL_ACCOUNTS);

  const handleUnbindEmailPress = index => {
    emails.filter(email => email !== emails[index]);
    Alert.alert(`success unbind email: ${emails[index]}`);
    setEmails(emails.filter(email => email !== emails[index]));
    setCurrentIndex(currentIndex - 1);
  };

  const handleBindEmailPress = email => {
    const regex = /[^@]+@[^\.]+\..+/;
    if (!regex.test(email)) {
      Alert.alert('please input valid email');
      return;
    }
    Alert.alert(`success bind email: ${email}`);
    setEmails([...emails, '']);
    setCurrentIndex(currentIndex + 1);
  };

  const handleEmailOnChange = (email, index) => {
    let newEmails = [...emails];
    newEmails[index] = email;
    setEmails(newEmails);
  };

  const handleFinishPress = () => {
    navigation.navigate('notification_permission');
  };

  const handleSkipPress = () => {
    navigation.navigate('notification_permission');
  };

  return (
    <Container>
      <Title>
        <FormattedMessage
          id="bind_email_accounts"
          defaultMessage="BIND EMAILS"
        />
      </Title>
      <Detail>
        <FormattedMessage id="dont_worry" />
      </Detail>

      {emails.map((email, index) => {
        const active = index === currentIndex;
        const isBind = index < currentIndex;
        const isNext = !active && !isBind;
        return (
          <EmailRowContainer isNext={isNext}>
            <EmailContainer>
              <Input
                type="email"
                onChangeText={text => handleEmailOnChange(text, index)}
                value={email}
                editable={active}
                readOnly={isBind}
                label={
                  <FormattedMessage
                    id="email_account"
                    defaultMessage="EMAIL {email_count}"
                    values={{
                      email_count: index + 1,
                    }}
                  />
                }
              />
            </EmailContainer>
            {isBind ? (
              <ThemeButton
                small
                disabled={isNext || !email}
                onPress={() => handleUnbindEmailPress(index)}>
                <FormattedMessage id="unbind" defaultMessage="unbind" />
              </ThemeButton>
            ) : (
              <ThemeButton
                small
                disabled={isNext || !email}
                onPress={() => handleBindEmailPress(email)}>
                <FormattedMessage id="login" />
              </ThemeButton>
            )}
          </EmailRowContainer>
        );
      })}
      <ThemeButton onPress={handleFinishPress}>
        <FormattedMessage id="finish" defaultMessage="finish" />
      </ThemeButton>
      <MarginContainer />
      <ThemeButton reverse small onPress={handleSkipPress}>
        <FormattedMessage id="skip_for_now" defaultMessage="Skip for now" />
      </ThemeButton>
      <BindMoreLaterText>
        <FormattedMessage
          id="bind_more_email_later"
          defaultMessage="You can bind more emails later in profile."
        />
      </BindMoreLaterText>
    </Container>
  );
};

export default BindEmailScreen;
