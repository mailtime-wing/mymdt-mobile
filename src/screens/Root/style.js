import styled from '@emotion/native';
import {StyleSheet} from 'react-native';

export const UpperSafeAreaView = styled.SafeAreaView`
  flex: 0;
  background-color: ${props => props.theme.colors.white.normal};
`;
export const LowerSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.black.normal};
`;

export const styles = StyleSheet.create({
  headerTitle: {
    display: 'none',
  },
  header: {
    height: 80,
  },
  card: {
    backgroundColor: 'white',
  },
});
