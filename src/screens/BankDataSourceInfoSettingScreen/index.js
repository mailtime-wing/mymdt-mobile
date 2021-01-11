import React, {useCallback} from 'react';

import BankDataSourceInfo from '@/components/BankDataSourceInfo';

const BankDataSourceInfoSettingScreen = ({navigation, route}) => {
  return (
    <BankDataSourceInfo
      type={route.params.type}
      countryCode={route.params.countryCode}
      onConnected={useCallback(() => {
        navigation.navigate('loading_account_information_setting');
      }, [navigation])}
    />
  );
};

export default BankDataSourceInfoSettingScreen;
