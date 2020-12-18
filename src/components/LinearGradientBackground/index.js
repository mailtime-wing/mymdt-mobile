import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view';
import {styles, safeAreaStyle} from './style';
import {useTheme} from 'emotion-theming';

const LinearGradientBackground = ({
  colors,
  children,
  style,
  safeAreaProps = {},
}) => {
  const theme = useTheme();
  return (
    <LinearGradient
      colors={colors || theme.colors.linearGradientBackground.theme}
      style={[styles.linearGradient, style]}>
      <SafeAreaView style={safeAreaStyle} {...safeAreaProps}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LinearGradientBackground;
