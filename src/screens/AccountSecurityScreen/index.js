import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {FormattedMessage} from 'react-intl';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';
import Config from 'react-native-config';

import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import HeaderTitle from '@/components/HeaderTitle';
import ListOption from '@/components/ListOption';
import SpecialListOption from '@/components/SpecialListOption';
import Switch from '@/components/Switch';
import EnterPinModal from '@/components/EnterPinModal';
import {GET_USER_SECURITY_SETTINGS} from '@/api/data';
import TickIcon from '@/assets/tick.svg';

import {container, tickButton} from './style';

const AccountSecurityScreen = ({navigation}) => {
  const theme = useTheme();
  const [isFaceIdToggled, setIsFaceIdToggled] = useState(false); // from api later
  const [showEnterPinModal, setShowEnterPinModal] = useState(false);
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

  const handleChangePhoneNumberPress = () => {
    setShowEnterPinModal(true);
  };

  return (
    <View>
      <HeaderTitle>
        <FormattedMessage id="account_security" />
      </HeaderTitle>
      <View style={container}>
        <ListOption
          key="pin"
          label={<FormattedMessage id="pin" />}
          onPress={handlePinPress}
          optionIcon={
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
        {Config.EXPERIMENTAL_FEATURE === 'true' && (
          <SpecialListOption
            label={<FormattedMessage id="face_id_or_touch_id" />}
            value={
              <Switch
                value={isFaceIdToggled}
                onChange={() => setIsFaceIdToggled(!isFaceIdToggled)}
              />
            }
          />
        )}
        {isPinSet && (
          <ListOption
            key="forget_pin"
            label={<FormattedMessage id="forget_pin" />}
            onPress={() => navigation.navigate('forget_pin')}
          />
        )}
        <ListOption
          key="change_phone_number"
          label={<FormattedMessage id="change_phone_number" />}
          onPress={handleChangePhoneNumberPress}
        />
        <EnterPinModal
          visible={showEnterPinModal}
          callback={() => setShowEnterPinModal(false)}
          onSuccess={(pin) =>
            navigation.navigate('verify_phone_number', {
              pin: pin,
            })
          }
        />
      </View>
    </View>
  );
};

export default AccountSecurityScreen;
