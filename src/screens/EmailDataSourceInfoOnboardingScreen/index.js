import React from 'react';

import DataSourceInfo from '@/components/DataSourceInfo';
import useSetupFlow from '@/hooks/useSetupFlow';

const EmailDataSourceInfoOnboardingScreen = ({route}) => {
  const {navigateByFlow} = useSetupFlow();

  return (
    <DataSourceInfo
      type="mailtime"
      onContinuePress={() => {
        navigateByFlow();
      }}
    />
  );
};

export default EmailDataSourceInfoOnboardingScreen;
