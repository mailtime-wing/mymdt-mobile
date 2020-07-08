import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {Container, ButtonContainer, EmailText} from './style';

import ModalContaienr from '@/components/ModalContainer';
import SpecialListOption from '@/components/SpecialListOption';
import ThemeButton from '@/components/ThemeButton';
import Switch from '@/components/Switch';

const emailsSampleData = [
  {email: 'foo@gmail.com', share: true},
  {email: 'bar@gmail.com', share: false},
  {email: 'foo.bar@mailtime.com', share: false},
];

const BindEmailEditScreen = () => {
  const [emails, setEmails] = useState(
    emailsSampleData.map(email => email.share),
  );

  const handleInputChange = index => {
    const data = [...emails];
    data[index] = !data[index];
    setEmails(data);
  };

  return (
    <ModalContaienr title={<FormattedMessage id="emails_binding" />}>
      <Container>
        {emails.map((email, index) => (
          <SpecialListOption
            label={<EmailText>{email.emailAddress}</EmailText>}
            value={
              <Switch
                value={emails[index]}
                onChange={() => handleInputChange(index)}
              />
            }
          />
        ))}
      </Container>
      <ButtonContainer>
        <ThemeButton small>
          <FormattedMessage id="add_email_account" />
        </ThemeButton>
      </ButtonContainer>
    </ModalContaienr>
  );
};

export default BindEmailEditScreen;
