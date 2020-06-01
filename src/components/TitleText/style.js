import styled from '@emotion/native';
import {Platform} from 'react-native';

export const Text = styled.Text`
  font-family: ${Platform.OS === 'ios'
    ? 'Neo Sans Pro'
    : 'Neo Sans Pro Medium'};
`;
