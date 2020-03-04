import styled from '@emotion/native';

export const Container = styled.View`
  background-color: ${props => props.theme.colors.white};
`;

export const TitleContainer = styled.View`
  padding: 0 30px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: 26px;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.black};
  margin-top: 5px;
`;
