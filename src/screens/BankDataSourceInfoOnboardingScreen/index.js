import React from 'react';

import BankDataSourceInfo from '@/components/BankDataSourceInfo';
import useSetupFlow from '@/hooks/useSetupFlow';

const BankDataSourceInfoOnboardingScreen = ({route}) => {
  const {navigateByFlow} = useSetupFlow();

  return (
    <BankDataSourceInfo
      type={route.params.type}
      countryCode={route.params.countryCode}
      onConnected={() => navigateByFlow('next')}
    />
  );
};

export default BankDataSourceInfoOnboardingScreen;
