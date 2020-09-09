import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {FormattedMessage} from 'react-intl';

import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import ModalContainer from '@/components/ModalContainer';
import ListOption from '@/components/ListOption';
import SpecialListOption from '@/components/SpecialListOption';
import Switch from '@/components/Switch';
import {GET_USER_SECURITY_SETTINGS} from '@/api/data';

import {Container} from './style';

const AccountSecurityScreen = ({navigation}) => {
  const [isFaceIdToggled, setIsFaceIdToggled] = useState(false); // from api later
  const {data, refetch} = useQueryWithAuth(GET_USER_SECURITY_SETTINGS, {
    fetchPolicy: 'network-only',
  });
  const isPinSet = data?.userProfile?.isPasscodeSet;

  useFocusEffect(() => {
    refetch();
  }, [navigation]);

  const handleSetPinToggle = async () => {
    if (!isPinSet) {
      navigation.navigate('setup_pin');
    }
  };

  const switchOptions = [
    {
      label: <FormattedMessage id="pin" />,
      value: <Switch value={isPinSet} onChange={handleSetPinToggle} />,
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
        {switchOptions.map(row => (
          <SpecialListOption
            key={row.label}
            label={row.label}
            value={row.value}
          />
        ))}
        {options.map((option, index) => (
          <ListOption
            key={option.label}
            label={option.label}
            onPress={option.onPress}
          />
        ))}
      </Container>
    </ModalContainer>
  );
};

export default AccountSecurityScreen;
