import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import {container} from './style';

import ChooseBindDataSource from '@/components/ChooseBindDataSource';

const IntroductionSettingScreen = ({navigation}) => {
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
    <View style={container(theme)}>
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
    </View>
  );
};

export default IntroductionSettingScreen;
