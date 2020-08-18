import styled from '@emotion/native';

export const Container = styled.View`
  padding-top: ${({hasTopBar}) => (hasTopBar ? '24px' : '8px')};
  padding-bottom: 24px;
`;
