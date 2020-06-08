import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientBackground = props => (
  <LinearGradient colors={['#FDFBF2', '#E2FAFF']}>
    {props.children}
  </LinearGradient>
);

export default LinearGradientBackground;
