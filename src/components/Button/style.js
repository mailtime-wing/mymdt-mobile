import styled from '@emotion/native';

export const Container = styled.TouchableOpacity`
  background-color: ${props =>
    props.disabled ? props.theme.colors.grey.light : props.theme.colors.black};
  text-transform: uppercase;
  font-size: 14px;
  ${props =>
    props.small
      ? `padding: 8px 24px;
  border-radius: 28px;`
      : `padding: 20px 100px;
  border-radius: 42px;`}
`;

export const Text = styled.Text`
  color: ${props => props.theme.colors.white};
  letter-spacing: 2.33333px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
`;
