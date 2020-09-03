import React from 'react';

import ScreenContainer from '@/components/ScreenContainer';
import RegionSectionList from '@/components/RegionSectionList';
import useSetupFlow from '@/hooks/useSetupFlow';

import {container} from './style';

const ChooseRegionScreen = () => {
  const {navigateByFlow} = useSetupFlow();

  return (
    <ScreenContainer hasTopBar style={container}>
      <RegionSectionList onItemPress={item => navigateByFlow('next', item)} />
    </ScreenContainer>
  );
};

export default ChooseRegionScreen;
