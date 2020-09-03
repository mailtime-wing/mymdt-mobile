import React from 'react';
import {useNavigationState} from '@react-navigation/native';

import DataSourceInfo from '@/components/DataSourceInfo';

const DataSourceInfoSettingScreen = ({navigation, route}) => {
  const navigationStateRoutes = useNavigationState(state => state.routes);

  return (
    <DataSourceInfo
      type={route.params.type}
      countryCode={route.params.countryCode}
      onConnected={() => {
        const linkedCardsSettingRoute = navigationStateRoutes.find(
          _route => _route.name === 'linked_cards_setting',
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

export default DataSourceInfoSettingScreen;
