import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'emotion-theming';

const LoadingSpinner = (props) => {
  const theme = useTheme();
  return (
    <ActivityIndicator
      size="large"
      color={theme.colors.secondary.normal}
      {...props}
    />
  );
};

export default LoadingSpinner;
