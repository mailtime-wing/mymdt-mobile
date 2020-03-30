import styled from '@emotion/native';

export const Container = styled.TouchableOpacity`
  background-color: ${props =>
    props.disabled
      ? props.theme.colors.grey.light
      : props.theme.colors.black.normal};
  text-transform: uppercase;
  font-size: 14px;
  min-height: 33px;
  ${props =>
    props.small
      ? `padding: 9.5px 24px;
  border-radius: 28px;`
      : `padding: 20px 50px;
  border-radius: 42px;`}
  ${props => props.width && `width: ${props.width}; align-self: center;`}
`;

export const Text = styled.Text`
  color: ${props =>
    props.disabled
      ? props.theme.colors.black.light
      : props.theme.colors.white.normal};
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
`;
