import React from 'react';
import {Text} from 'react-native';
import styled from '@emotion/native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Bonus = () => (
  <Container>
    <Text>This is Bonus Page</Text>
  </Container>
);

export default Bonus;
