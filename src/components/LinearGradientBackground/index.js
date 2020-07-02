import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './style';

const LinearGradientBackground = props => (
  <LinearGradient colors={['#FDFBF2', '#E2FAFF']} style={styles.linearGradient}>
    {props.children}
  </LinearGradient>
);

export default LinearGradientBackground;
