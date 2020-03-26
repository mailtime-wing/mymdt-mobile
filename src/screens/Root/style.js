import styled from '@emotion/native';

export const UpperSafeAreaView = styled.SafeAreaView`
  flex: 0;
  background-color: ${props => props.theme.colors.white.normal};
`;
export const LowerSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.black.normal};
`;
