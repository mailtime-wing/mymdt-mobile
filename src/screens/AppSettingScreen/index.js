import React, {useContext, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {IntlContext} from '@/context/Intl';

import ModalContainer from '@/components/ModalContainer';
import ListOption from '@/components/ListOption';
import SpecialListOption from '@/components/SpecialListOption';
import Switch from '@/components/Switch';

import {Container} from './style';

const SettingScreen = ({navigation}) => {
  const {language} = useContext(IntlContext);
  const [push, setPush] = useState(false); // from api later
  return (
    <ModalContainer
      title={
        <FormattedMessage id="app_settings" defaultMessage="App settings" />
      }>
      <Container>
        <ListOption
          key="language"
          label={<FormattedMessage id="language" />}
          value={language}
          onPress={() => navigation.navigate('language')}
        />
        <ListOption
          key="currency"
          label={<FormattedMessage id="currency" />}
          value="USD"
        />
        <SpecialListOption
          key="push_notification"
          label={<FormattedMessage id="push_notification" />}
          value={<Switch value={push} onChange={() => setPush(!push)} />}
        />
      </Container>
    </ModalContainer>
  );
};

export default SettingScreen;
