import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import {rowContainer, rowTextStyle} from './style';

import AppText from '@/components/AppText2';

const SpecialListOption = ({label, value, style, ...props}) => {
  const theme = useTheme();
  return (
    <View style={[rowContainer, style]} {...props}>
      <AppText variant="body1" style={rowTextStyle(theme)}>
        {label}
      </AppText>
      {value}
    </View>
  );
};

export default SpecialListOption;
