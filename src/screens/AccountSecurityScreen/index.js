import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';

import ModalContainer from '@/components/ModalContainer';
import ListOption from '@/components/ListOption';
import SpecialListOption from '@/components/SpecialListOption';
import Switch from '@/components/Switch';

import {Container} from './style';

const AccountSecurityScreen = ({navigation}) => {
  const [isPinToggled, setIsPinToggled] = useState(false); // from api later
  const [isFaceIdToggled, setIsFaceIdToggled] = useState(false); // from api later

  const switchOptions = [
    {
      label: <FormattedMessage id="pin" />,
      value: (
        <Switch
          value={isPinToggled}
          onChange={() => setIsPinToggled(!isPinToggled)}
        />
      ),
    },
    {
      label: <FormattedMessage id="face_id_or_touch_id" />,
      value: (
        <Switch
          value={isFaceIdToggled}
          onChange={() => setIsFaceIdToggled(!isFaceIdToggled)}
        />
      ),
    },
  ];

  const options = [
    {
      label: <FormattedMessage id="forget_pin" />,
      onPress: () => navigation.navigate('forget_pin'),
    },
    {
      label: <FormattedMessage id="change_pin" />,
      onPress: () => navigation.navigate('change_pin'),
    },
    {
      label: <FormattedMessage id="change_phone_number" />,
      onPress: () => navigation.navigate('language'),
    },
  ];

  return (
    <ModalContainer title={<FormattedMessage id="account_security" />}>
      <Container>
        {switchOptions.map((row, index) => (
          <SpecialListOption key={index} label={row.label} value={row.value} />
        ))}
        {options.map((option, index) => (
          <ListOption
            key={index}
            label={option.label}
            onPress={option.onPress}
          />
        ))}
      </Container>
    </ModalContainer>
  );
};

export default AccountSecurityScreen;
