import styled from '@emotion/native';

export const Container = styled.View`
  margin-top: 136px;
`;

export const Title = styled.Text`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 2px;
  font-weight: 500;
  margin-bottom: 29px;
  text-transform: uppercase;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Detail = styled.Text`
  font-size: 16px;
  line-height: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const StartAndAgree = styled.Text`
  font-size: 10px;
  color: ${props => props.theme.colors.grey.dark};
  margin-top: 11px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const PaddingContainer = styled.View`
  padding-left: 24px;
  padding-right: 24px;
`;

export const AppIconGridImageContainer = styled.View`
  margin-top: 48px;
  margin-bottom: 48px;
`;
export const AppIconGridImage = styled.Image``;
