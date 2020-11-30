import React from 'react';
import {useNavigationState} from '@react-navigation/native';

import BankDataSourceInfo from '@/components/BankDataSourceInfo';

const BankDataSourceInfoSettingScreen = ({navigation, route}) => {
  const navigationStateRoutes = useNavigationState((state) => state.routes);

  return (
    <BankDataSourceInfo
      type={route.params.type}
      countryCode={route.params.countryCode}
      onConnected={() => {
        const linkedCardsSettingRoute = navigationStateRoutes.find(
          (_route) => _route.name === 'linked_cards_setting',
        );
        if (linkedCardsSettingRoute) {
          navigation.navigate({key: linkedCardsSettingRoute.key});
          return;
        }

        navigation.popToTop();
      }}
    />
  );
};

export default BankDataSourceInfoSettingScreen;
