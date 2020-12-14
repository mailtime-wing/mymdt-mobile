import React from 'react';
import {View} from 'react-native';

import RegionSectionList from '@/components/RegionSectionList';

import {container} from './style';

const ChooseRegionScreen = ({navigation}) => (
  <View style={container}>
    <RegionSectionList
      onItemPress={(item) =>
        navigation.navigate('bank_data_source_info_setting', item)
      }
    />
  </View>
);

export default ChooseRegionScreen;
