import React, {useContext, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {IntlContext} from '@/context/Intl';

import ModalContainer from '@/components/ModalContainer';
import SpecialListOption from '@/components/SpecialListOption';
import ListOption from '@/components/ListOption';
import Switch from '@/components/Switch';

import {Container} from './style';

const SettingScreen = ({navigation}) => {
  const {language} = useContext(IntlContext);
  const [push, setPush] = useState(false); // from api later
  return (
    <ModalContainer title={<FormattedMessage id="settings" />}>
      <Container>
        <ListOption
          label={<FormattedMessage id="language" />}
          value={language}
          onPress={() => navigation.navigate('language')}
        />
        <ListOption label={<FormattedMessage id="currency" />} value="USD" />
        <SpecialListOption
          label={<FormattedMessage id="push_notification" />}
          value={<Switch value={push} onChange={() => setPush(!push)} />}
        />
      </Container>
    </ModalContainer>
  );
};

export default SettingScreen;
