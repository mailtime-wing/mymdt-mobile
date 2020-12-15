import React from 'react';

import RegionSectionList from '@/components/RegionSectionList';

const ChooseRegionSettingScreen = ({navigation}) => (
  <RegionSectionList
    onItemPress={(item) =>
      navigation.navigate('bank_data_source_info_setting', item)
    }
  />
);

export default ChooseRegionSettingScreen;
