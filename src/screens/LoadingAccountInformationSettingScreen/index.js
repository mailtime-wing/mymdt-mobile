import React, {useCallback} from 'react';
import {useNavigationState} from '@react-navigation/native';
import LoadingAccountInformation from '@/components/LoadingAccountInformation';

const LoadingAccountInformationSettingScreen = ({navigation}) => {
  const navigationStateRoutes = useNavigationState((state) => state.routes);

  const linkedCardsSettingRouteKey = navigationStateRoutes.find(
    (_route) => _route.name === 'linked_cards_setting',
  )?.key;

  return (
    <LoadingAccountInformation
      onBind={useCallback(() => {
        if (linkedCardsSettingRouteKey) {
          navigation.navigate({key: linkedCardsSettingRouteKey});
          return;
        }

        navigation.popToTop();
      }, [linkedCardsSettingRouteKey, navigation])}
      onError={useCallback(() => {
        navigation.goBack();
      }, [navigation])}
    />
  );
};

export default LoadingAccountInformationSettingScreen;
