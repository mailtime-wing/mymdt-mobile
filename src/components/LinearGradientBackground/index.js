import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './style';

const LinearGradientBackground = ({children, style}) => (
  <LinearGradient
    colors={['#FDFBF2', '#E2FAFF']}
    style={[styles.linearGradient, style]}>
    {children}
  </LinearGradient>
);

export default LinearGradientBackground;
