import React from 'react';

import DataSourceInfo from '@/components/DataSourceInfo';
import useSetupFlow from '@/hooks/useSetupFlow';

const DataSourceInfoScreen = ({route}) => {
  const {navigateByFlow} = useSetupFlow();

  return (
    <DataSourceInfo
      type={route.params.type}
      countryCode={route.params.countryCode}
      onConnected={() => navigateByFlow('next')}
    />
  );
};

export default DataSourceInfoScreen;
