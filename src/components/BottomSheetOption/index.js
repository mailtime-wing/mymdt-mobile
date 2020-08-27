import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';
import {option, listLabel, listValue, rightSide} from './style';

import AppText from '@/components/AppText2';
import TickIcon from '@/assets/tick.svg';

const BottomSheetOption = ({label, value, active, ...props}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={option(theme, active)} active={active} {...props}>
      <AppText variant="body1" style={listLabel(theme, active)}>
        {label}
      </AppText>
      <View style={rightSide}>
        {value && (
          <AppText variant="body1" style={listValue(theme)}>
            {value}
          </AppText>
        )}
        {active && (
          <TickIcon stroke={theme.colors.secondary.dark} strokeWidth="2" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BottomSheetOption;
