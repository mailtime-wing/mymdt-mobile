import styled from '@emotion/native';

export const Container = styled.View`
  padding: 99px 30px 38px 30px;
`;

export const Details = styled.Text`
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.5px;
  color: ${props => props.theme.colors.black.normal};
  margin-bottom: 30px;
`;

export const EditLater = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.black.normal};
  margin-top: 8px;
  text-align: center;
`;
