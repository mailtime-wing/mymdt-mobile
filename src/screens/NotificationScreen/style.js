import styled from '@emotion/native';

export const Container = styled.View`
  padding: 80px 30px 0 30px;
`;

export const Title = styled.Text`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 16px;
  text-transform: uppercase;
`;

export const Detail = styled.Text`
  font-size: 14px;
  line-height: 17px;
  margin-top: 15px;
  margin-bottom: 64px;
`;

export const MarginContainer = styled.View`
  margin-top: 16px;
`;

export const NotificationPermission = styled.Image`
  align-self: center;
`;

export const UpArrow = styled.Image`
  margin-left: 60%;
  margin-top: 8px;
  margin-bottom: 72px;
`;
