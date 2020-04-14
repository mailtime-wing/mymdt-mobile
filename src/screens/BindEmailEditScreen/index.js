import React, { useState } from 'react'
import { Text } from 'react-native'
import Switches from 'react-native-switches'
import { useTheme } from 'emotion-theming';
import { FormattedMessage } from 'react-intl';
import ModalContaienr from '@/components/ModalContainer';
import ProfileDataRow from '@/components/ProfileDataRow'
import {
  Container,
  Title,
} from './style';

const emailsSampleData = [
  { email: 'foo@gmail.com', share: true },
  { email: 'bar@gmail.com', share: false },
  { email: 'foo.bar@mailtime.com', share: false },
]

const Switch = ({ emails, setEmails, id }) => {
  const theme = useTheme()

  const handleInputChange = (id) => {
    const data = [...emails]
    data[id] = !data[id]
    setEmails(data)
  }

  return (
    <Switches
      shape='pill'
      borderColor={theme.colors.black.normal}
      borderWidth={2}
      buttonSize={24}
      buttonOffsetLeft={2}
      buttonOffsetRight={6} // offsetLeft+border
      buttonColor={theme.colors.black.normal}
      colorSwitchOff={theme.colors.white.normal}
      colorSwitchOn={theme.colors.white.normal}
      onChange={() => handleInputChange(id)}
      value={emails[id]}
    />
  )
}

const BindEmailEditScreen = () => {
  const [emails, setEmails] = useState(emailsSampleData.map(email => email.share))

  return (
    <ModalContaienr>
      <Container>
        <Title><FormattedMessage id='emails_binding' /></Title>
        {emailsSampleData.map((email, index) =>
          <ProfileDataRow label={email.email} value={<Switch emails={emails} id={index} setEmails={setEmails} />} />
        )}
      </Container>
    </ModalContaienr>
  )
}


export default BindEmailEditScreen