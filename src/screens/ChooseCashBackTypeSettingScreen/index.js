import React, {useLayoutEffect} from 'react';
import {useTheme} from 'emotion-theming';

import ChooseCashBackType from '@/components/ChooseCashBackType';

const ChooseCashBackTypeSettingScreen = ({navigation}) => {
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.colors.themeBackground,
        elevation: 0,
        shadowColor: 'transparent',
      },
    });
  });

  return <ChooseCashBackType onChoose={() => navigation.goBack()} />;
};

export default ChooseCashBackTypeSettingScreen;
