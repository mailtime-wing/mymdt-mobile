import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {Container, ButtonContainer, Text} from './style';

import ModalContaienr from '@/components/ModalContainer';
import ProfileDataRow from '@/components/ProfileDataRow';
import Button from '@/components/Button';
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
        {emailsSampleData.map((email, index) => (
          <ProfileDataRow
            label={<Text>{email.email}</Text>}
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
        <Button small>
          <FormattedMessage id="add_email_account" />
        </Button>
      </ButtonContainer>
    </ModalContaienr>
  );
};

export default BindEmailEditScreen;
