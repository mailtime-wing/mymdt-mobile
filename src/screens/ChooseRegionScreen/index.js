import React from 'react';

import RegionSectionList from '@/components/RegionSectionList';
import useSetupFlow from '@/hooks/useSetupFlow';

const ChooseRegionScreen = () => {
  const {navigateByFlow} = useSetupFlow();

  return (
    <RegionSectionList onItemPress={(item) => navigateByFlow('next', item)} />
  );
};

export default ChooseRegionScreen;
