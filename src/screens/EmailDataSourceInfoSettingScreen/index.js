import React from 'react';

import DataSourceInfo from '@/components/DataSourceInfo';

const EmailDataSourceInfoSettingScreen = ({navigation}) => {
  return (
    <DataSourceInfo
      type="mailtime"
      onContinuePress={() =>
        navigation.navigate('emails_binding', {navigateFromEdit: true})
      }
    />
  );
};

export default EmailDataSourceInfoSettingScreen;
