import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Container} from './style';
import {useTheme} from 'emotion-theming';

const LoadingSpinner = () => {
  const theme = useTheme();
  return (
    <Container>
      <ActivityIndicator size="large" color={theme.colors.secondary.normal} />
    </Container>
  );
};

export default LoadingSpinner;
