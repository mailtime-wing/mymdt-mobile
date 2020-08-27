import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view';
import {styles, safeAreaStyle} from './style';

const LinearGradientBackground = ({children, style}) => (
  <LinearGradient
    colors={['#FDFBF2', '#E2FAFF']}
    style={[styles.linearGradient, style]}>
    <SafeAreaView style={safeAreaStyle}>{children}</SafeAreaView>
  </LinearGradient>
);

export default LinearGradientBackground;
