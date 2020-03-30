import React, {useState} from 'react';
import {Text} from 'react-native';
import {FormattedMessage} from 'react-intl';

import ModalContaienr from '@/components/ModalContainer';
import ProfileDataRow from '@/components/ProfileDataRow';
import Switch from '@/components/Switch';

import {Container, ListOption, Image} from './style';

const AccountSecurityScreen = ({navigation}) => {
  const [pinAndFaceId, setPinAndFaceId] = useState(false); // from api later
  return (
    <ModalContaienr title={<FormattedMessage id="account_security" />}>
      <Container>
        <ProfileDataRow
          label={
            <Text>
              <FormattedMessage id="pin_and_face_id" />
            </Text>
          }
          value={
            <Switch
              value={pinAndFaceId}
              onChange={() => setPinAndFaceId(!pinAndFaceId)}
            />
          }
        />
        <ProfileDataRow
          label={
            <Text>
              <FormattedMessage id="forget_pin" />
            </Text>
          }
          value={
            <ListOption onPress={() => navigation.navigate('language')}>
              <Image source={require('@/assets/black_arrow.png')} />
            </ListOption>
          }
        />
        <ProfileDataRow
          label={
            <Text>
              <FormattedMessage id="change_phone_number" />
            </Text>
          }
          value={
            <ListOption>
              <Image source={require('@/assets/black_arrow.png')} />
            </ListOption>
          }
        />
      </Container>
    </ModalContaienr>
  );
};

export default AccountSecurityScreen;
