import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import AppText from '@/components/AppText2';
import AppIcon from '@/components/AppIcon';

import {container, header, textContainer} from './style';
import {useTheme} from 'emotion-theming';

const BindingButton = ({icon, title, caption, ...props}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity {...props}>
      <View style={container(theme)}>
        <AppIcon
          svgIcon={icon}
          sizeVariant="normal"
          color={theme.colors.background1}
          backgroundColor={theme.colors.secondary.normal}
        />
        <View style={textContainer}>
          <AppText variant="heading5" style={header(theme)}>
            {title}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BindingButton;
