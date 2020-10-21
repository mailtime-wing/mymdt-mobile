import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view';
import {styles, safeAreaStyle} from './style';
import {useTheme} from 'emotion-theming';

const LinearGradientBackground = ({colors, children, style}) => {
  const theme = useTheme();
  return (
    <LinearGradient
      colors={colors || theme.colors.linearGradientBackground}
      style={[styles.linearGradient, style]}>
      <SafeAreaView style={safeAreaStyle}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default LinearGradientBackground;
