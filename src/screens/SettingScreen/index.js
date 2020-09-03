import React from 'react';
import {View, ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {listHeader, container} from './style';

import ListOption from '@/components/ListOption';
import ModalContainer from '@/components/ModalContainer';
import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';

const SettingScreen = ({navigation}) => {
  const theme = useTheme();

  const accountSettingList = [
    {id: 'edit_profile'},
    {id: 'offers_preference_edit'},
    {id: 'emails_binding_edit'},
    {
      id: 'linked_cards_setting',
      messageId: 'linkedBankAccounts',
    },
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
    <ScrollView>
      <ModalContainer
        title={<FormattedMessage id="settings" defaultMessage="Settings" />}>
        <View style={container}>
          <AppText variant="label" style={listHeader(theme)}>
            <FormattedMessage id="account" defaultMessage="Account" />
          </AppText>
          {accountSettingList.map(as => (
            <ListOption
              key={as.id}
              label={<FormattedMessage id={as.messageId || as.id} />}
              onPress={() => navigation.navigate(as.id, as.params)}
            />
          ))}
          <AppText variant="label" style={listHeader(theme)}>
            <FormattedMessage
              id="settings_and_support"
              defaultMessage="Settings & Support"
            />
          </AppText>
          {generalSettingList.map(gs => (
            <ListOption
              key={gs.id}
              label={<FormattedMessage id={gs.id} />}
              onPress={() => navigation.navigate(gs.id)}
            />
          ))}
        </View>
      </ModalContainer>
    </ScrollView>
  );
};

export default SettingScreen;
