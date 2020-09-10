import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {FormattedMessage} from 'react-intl';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import ModalContainer from '@/components/ModalContainer';
import ListOption from '@/components/ListOption';
import SpecialListOption from '@/components/SpecialListOption';
import Switch from '@/components/Switch';
import {GET_USER_SECURITY_SETTINGS} from '@/api/data';

import TickIcon from '@/assets/tick.svg';

import {container, tickButton} from './style';

const AccountSecurityScreen = ({navigation}) => {
  const theme = useTheme();
  const [isFaceIdToggled, setIsFaceIdToggled] = useState(false); // from api later
  const {data, refetch} = useQueryWithAuth(GET_USER_SECURITY_SETTINGS, {
    fetchPolicy: 'network-only',
  });
  const isPinSet = data?.userProfile?.isPasscodeSet;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handlePinPress = () => {
    if (!isPinSet) {
      navigation.navigate('setup_pin');
    } else {
      navigation.navigate('change_pin');
    }
  };

  const switchOptions = [
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
      label: <FormattedMessage id="change_phone_number" />,
      onPress: () => navigation.navigate('language'),
    },
  ];

  return (
    <ModalContainer title={<FormattedMessage id="account_security" />}>
      <View style={container}>
        <ListOption
          key="pin"
          label={<FormattedMessage id="pin" />}
          onPress={handlePinPress}
          icon={
            isPinSet && (
              <View style={tickButton(theme)}>
                <TickIcon
                  stroke={theme.colors.background1}
                  strokeWidth="2"
                  width="12"
                  height="10"
                />
              </View>
            )
          }
        />
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
      </View>
    </ModalContainer>
  );
};

export default AccountSecurityScreen;
