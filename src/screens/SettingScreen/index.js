import React from 'react';
import {FormattedMessage} from 'react-intl';

import {ScrollContainer, Container, ListHeader} from './style';

import ListOption from '@/components/ListOption';
import ModalContainer from '@/components/ModalContainer';

const SettingScreen = ({navigation}) => {
  const accountSettingList = [
    {id: 'edit_profile'},
    {id: 'offers_preference'},
    {id: 'emails_binding'},
    {id: 'account_security'},
    {id: 'sign_out'},
  ];

  const generalSettingList = [
    {id: 'app_settings'},
    {id: 'faq_and_support'},
    {id: 'terms_of_service'},
    {id: 'privacy_policy'},
    {id: 'about_us'},
  ];

  return (
    <ScrollContainer>
      <ModalContainer
        title={<FormattedMessage id="settings" defaultMessage="Settings" />}>
        <Container>
          <ListHeader>
            <FormattedMessage id="account" defaultMessage="Account" />
          </ListHeader>
          {accountSettingList.map(as => (
            <ListOption
              key={as.id}
              label={<FormattedMessage id={as.id} />}
              onPress={() => navigation.navigate(as.id)}
            />
          ))}
          <ListHeader>
            <FormattedMessage
              id="settings_and_support"
              defaultMessage="Settings & Support"
            />
          </ListHeader>
          {generalSettingList.map(gs => (
            <ListOption
              key={gs.id}
              label={<FormattedMessage id={gs.id} />}
              onPress={() => navigation.navigate(gs.id)}
            />
          ))}
        </Container>
      </ModalContainer>
    </ScrollContainer>
  );
};

export default SettingScreen;
