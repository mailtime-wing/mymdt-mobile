import React from 'react';
import StackNavigationContainer from '@/components/StackNavigationContainer';
import styled from '@emotion/native';

const Container = styled.SafeAreaView`
  height: 100%;
`;

const ModalStack = props => {
  return (
    <Container>
      <StackNavigationContainer {...props} />
    </Container>
  );
};

export default ModalStack;
