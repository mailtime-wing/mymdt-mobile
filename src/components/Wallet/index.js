import React from 'react';
import {Text} from 'react-native';
import styled from '@emotion/native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Wallet = () => (
  <Container>
    <Text>This is Wallet Page</Text>
  </Container>
);

export default Wallet;
