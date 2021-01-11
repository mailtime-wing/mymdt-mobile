import React, {useCallback} from 'react';
import LoadingAccountInformation from '@/components/LoadingAccountInformation';

import useSetupFlow from '@/hooks/useSetupFlow';

const LoadingAccountInformationOnboardingScreen = ({navigation}) => {
  const {navigateByFlow} = useSetupFlow();

  return (
    <LoadingAccountInformation
      onBind={useCallback(() => {
        navigateByFlow('next');
      }, [navigateByFlow])}
      onError={useCallback(() => {
        navigation.goBack();
      }, [navigation])}
    />
  );
};

export default LoadingAccountInformationOnboardingScreen;
