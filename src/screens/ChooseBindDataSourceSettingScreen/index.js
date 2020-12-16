import React, {useLayoutEffect} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {useTheme} from 'emotion-theming';

import {container} from './style';

import ChooseBindDataSource from '@/components/ChooseBindDataSource';

const ChooseBindDataSourceSettingScreen = ({navigation}) => {
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

  return (
    <SafeAreaView forceInset={{bottom: 'always'}} style={container(theme)}>
      <ChooseBindDataSource
        onEmailChoose={() =>
          navigation.navigate('settings', {
            screen: 'linked_emails_setting',
          })
        }
        onBankChoose={() =>
          navigation.navigate('settings', {
            screen: 'linked_cards_setting',
          })
        }
      />
    </SafeAreaView>
  );
};

export default ChooseBindDataSourceSettingScreen;
