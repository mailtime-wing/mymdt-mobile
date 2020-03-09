import styled from '@emotion/native';

export const VerificationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 21px;
  margin-bottom: 109px;
`;

export const Title = styled.Text`
  font-size: 26px;
  line-height: 31px;
  letter-spacing: 2px;
  margin-bottom: 29px;
`;

export const Container = styled.View`
  padding: 90px 30px;
`;

export const LoginAndAgree = styled.Text`
  font-size: 10px;
  color: ${props => props.theme.colors.grey.dark};
  margin-top: 11px;
`;
