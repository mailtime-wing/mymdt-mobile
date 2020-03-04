import styled from '@emotion/native';

export const Container = styled.View`
  margin-top: 16px;
  padding-top: 40px;
  padding-bottom: 30px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: ${props => props.theme.colors.white};
`;

export const ScrollContainer = styled.ScrollView`
  background-color: ${props => props.theme.colors.white};
`;
