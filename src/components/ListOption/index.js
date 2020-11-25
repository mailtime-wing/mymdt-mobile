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

const ListOption = ({
  label,
  value,
  icon: SvgIcon,
  optionIcon,
  noArrow,
  style,
  ...props
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={[option, style]} {...props}>
      <View style={valueContainer}>
        {SvgIcon && (
          <SvgIcon
            stroke={theme.colors.secondary.normal}
            strokeWidth="2"
            style={marginRight}
          />
        )}
        <AppText variant="body1" style={listLabel(theme)}>
          {label}
        </AppText>
      </View>
      <View style={valueContainer}>
        {value && (
          <AppText variant="body1" style={[listValue(theme), marginRight]}>
            {value}
          </AppText>
        )}
        {optionIcon && <View style={marginRight}>{optionIcon}</View>}
        {noArrow ? null : (
          <ArrowIcon stroke={theme.colors.borderColor} strokeWidth={2} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListOption;
