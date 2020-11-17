import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import AppText from '@/components/AppText2';
import {congrats, member, container, button} from './style';
import {useTheme} from 'emotion-theming';
import AppButton from '@/components/AppButton';

const UpgradeScreen = ({navigation, route}) => {
  const theme = useTheme();
  const {level} = route.params || 0;

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: {
        backgroundColor: theme.colors.linesBackground,
      },
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
        backgroundColor: theme.colors.linesBackground,
      },
    });
  }, [navigation, theme.colors.linesBackground]);

  return (
    <View style={container}>
      <AppText variant="heading2" style={congrats(theme)}>
        Congratulations!
      </AppText>
      <AppText variant="heading5" style={member(theme)}>
        You are {<FormattedMessage id={`membership_level_${level}`} />} member
        now
      </AppText>
      <AppButton
        variant="filled"
        sizeVariant="large"
        colorVariant="secondary"
        text={<FormattedMessage id="button.continue" />}
        style={button}
        onPress={() => navigation.pop()}
      />
    </View>
  );
};

export default UpgradeScreen;
