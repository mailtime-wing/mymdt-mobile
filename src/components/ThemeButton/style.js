import styled from '@emotion/native';

export const Container = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.secondary.normal};
  opacity: ${props => props.disabled && '0.5'};

  text-transform: uppercase;
  min-height: 33px;

  ${props =>
    props.small
      ? `padding: 9.5px 24px;
  border-radius: 28px;`
      : `padding: 20px 50px;
  border-radius: 42px;`}
  ${props => props.width && `width: ${props.width}; align-self: center;`}
  ${props =>
    props.reverse &&
    `background-color: ${props.theme.colors.white.normal}; border: 1px solid ${
      props.theme.colors.secondary.light
    };`}
`;

export const Text = styled.Text`
  color: ${props => props.theme.colors.white.normal};
  letter-spacing: 4px;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;

  ${props => props.small && 'font-size: 14px; letter-spacing: 2px;'};

  color: ${props =>
    props.reverse
      ? props.theme.colors.secondary.normal
      : props.theme.colors.white.normal};
`;
