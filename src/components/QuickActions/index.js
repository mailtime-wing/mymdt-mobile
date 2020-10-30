import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';

import {
  sectionContainer,
  actionsContainer,
  nameStyle,
  shortcut,
  quickActions,
} from './style';
import LinearGradient from 'react-native-linear-gradient';

import AppText from '@/components/AppText2';
import AppIcon from '@/components/AppIcon';

const QuickActions = ({actionList, style}) => {
  const theme = useTheme();

  return (
    <LinearGradient
      colors={theme.colors.linearGradientBackground.contrast}
      style={[sectionContainer, style]}>
      <AppText variant="heading6" style={quickActions(theme)}>
        Quick Actions
      </AppText>
      <View style={actionsContainer}>
        {actionList.map(({name, icon, action}) => (
          <TouchableOpacity key={name} style={shortcut} onPress={action}>
            <AppIcon
              color={theme.colors.secondary.normal}
              sizeVariant="normal"
              svgIcon={icon}
            />
            <AppText variant="caption" style={nameStyle(theme)}>
              {name}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};
export default QuickActions;
