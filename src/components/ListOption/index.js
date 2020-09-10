import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  listLabel,
  listValue,
  marginRight,
  option,
  valueContainer,
} from './style';
import {useTheme} from 'emotion-theming';

import ArrowIcon from '@/assets/list_arrow.svg';

import AppText from '@/components/AppText2';

const ListOption = ({label, value, icon, noArrow, ...props}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={option} {...props}>
      <AppText variant="body1" style={listLabel(theme)}>
        {label}
      </AppText>
      <View style={valueContainer}>
        {value && (
          <AppText variant="body1" style={[listValue(theme), marginRight]}>
            {value}
          </AppText>
        )}
        {icon && <View style={marginRight}>{icon}</View>}
        {noArrow ? null : (
          <ArrowIcon stroke={theme.colors.borderColor} strokeWidth={2} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListOption;
