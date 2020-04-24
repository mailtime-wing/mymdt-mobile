import styled from '@emotion/native';

export const Container = styled.View`
  margin-top: 136px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Title = styled.Text`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 2px;
  font-weight: 500;
  margin-bottom: 29px;
  text-transform: uppercase;
`;

export const Detail = styled.Text`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 400px;
`;

export const StartAndAgree = styled.Text`
  font-size: 10px;
  color: ${props => props.theme.colors.grey.dark};
  margin-top: 11px;
  padding: 0 24px;
`;
