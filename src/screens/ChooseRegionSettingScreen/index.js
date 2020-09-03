import React from 'react';

import ModalContainer from '@/components/ModalContainer';
import RegionSectionList from '@/components/RegionSectionList';

import {container} from './style';

const ChooseRegionScreen = ({navigation}) => (
  <ModalContainer style={container}>
    <RegionSectionList
      onItemPress={item =>
        navigation.navigate('data_source_info_setting', item)
      }
    />
  </ModalContainer>
);

export default ChooseRegionScreen;
