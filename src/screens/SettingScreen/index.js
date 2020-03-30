import React, {useContext, useState} from 'react';
import {Text} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {IntlContext} from '@/context/Intl';

import ModalContaienr from '@/components/ModalContainer';
import ProfileDataRow from '@/components/ProfileDataRow';
import Switch from '@/components/Switch';

import {Container, Title, ListOption, Image} from './style';

const SettingScreen = ({navigation}) => {
  const {language} = useContext(IntlContext);
  const [push, setPush] = useState(false); // from api later
  return (
    <ModalContaienr>
      <Container>
        <Title>
          <FormattedMessage id="settings" />
        </Title>
        <ProfileDataRow
          label={
            <Text>
              <FormattedMessage id="language" />
            </Text>
          }
          value={
            <ListOption onPress={() => navigation.navigate('language')}>
              <Text>{language}</Text>
              <Image source={require('@/assets/black_arrow.png')} />
            </ListOption>
          }
        />
        <ProfileDataRow
          label={
            <Text>
              <FormattedMessage id="currency" />
            </Text>
          }
          value={
            <ListOption>
              <Text>USD</Text>
              <Image source={require('@/assets/black_arrow.png')} />
            </ListOption>
          }
        />
        <ProfileDataRow
          label={
            <Text>
              <FormattedMessage id="push_notification" />
            </Text>
          }
          value={<Switch value={push} onChange={() => setPush(!push)} />}
        />
      </Container>
    </ModalContaienr>
  );
};

export default SettingScreen;
