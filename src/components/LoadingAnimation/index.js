import React from 'react';
import LottieView from 'lottie-react-native';
import {animation} from './style';

const LoadingAnimation = () => {
  return (
    <LottieView
      source={require('./button_animation.json')}
      resizeMode="contain"
      autoPlay
      style={animation}
    />
  );
};

export default LoadingAnimation;
