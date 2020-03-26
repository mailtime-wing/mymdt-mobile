import React, {useState} from 'react';
import Switches from 'react-native-switches';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';
import {Container, Title, ButtonContainer, Text} from './style';

import ModalContaienr from '@/components/ModalContainer';
import ProfileDataRow from '@/components/ProfileDataRow';
import Button from '@/components/Button';

const emailsSampleData = [
  {email: 'foo@gmail.com', share: true},
  {email: 'bar@gmail.com', share: false},
  {email: 'foo.bar@mailtime.com', share: false},
];

const Switch = ({emails, setEmails, id}) => {
  const theme = useTheme();

  const handleInputChange = index => {
    const data = [...emails];
    data[index] = !data[index];
    setEmails(data);
  };

  return (
    <Switches
      shape="pill"
      borderColor={theme.colors.black.normal}
      borderWidth={2}
      buttonSize={12}
      sliderHeight={20}
      sliderWidth={36}
      buttonOffsetLeft={2}
      buttonOffsetRight={6} // offsetLeft+border
      buttonColor={theme.colors.black.normal}
      colorSwitchOff={theme.colors.white.normal}
      colorSwitchOn={theme.colors.white.normal}
      showText={false}
      onChange={() => handleInputChange(id)}
      value={emails[id]}
    />
  );
};

const BindEmailEditScreen = () => {
  const [emails, setEmails] = useState(
    emailsSampleData.map(email => email.share),
  );

  return (
    <ModalContaienr>
      <Container>
        <Title>
          <FormattedMessage id="emails_binding" />
        </Title>
        {emailsSampleData.map((email, index) => (
          <ProfileDataRow
            label={<Text>{email.email}</Text>}
            value={<Switch emails={emails} id={index} setEmails={setEmails} />}
          />
        ))}
      </Container>
      <ButtonContainer>
        <Button small>
          <FormattedMessage id="add_email_account" />
        </Button>
      </ButtonContainer>
    </ModalContaienr>
  );
};

export default BindEmailEditScreen;
