import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'emotion-theming';

const LoadingSpinner = ({style, color}) => {
  const theme = useTheme();
  return (
    <ActivityIndicator
      size="large"
      color={color || theme.colors.secondary.normal}
      style={style}
    />
  );
};

export default LoadingSpinner;
