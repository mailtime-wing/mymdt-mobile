import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.TouchableOpacity`
  background-color: ${props =>
    props.disabled
      ? props.theme.colors.grey.light
      : props.theme.colors.contrastColor};
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
    `background-color: ${props.theme.colors.background1}; border: 1px solid ${
      props.theme.colors.contrastColor
    };`}
`;

export const ButtonText = styled(Text)`
  color: ${props =>
    props.disabled
      ? props.theme.colors.background2
      : props.theme.colors.background1};
  letter-spacing: 2px;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;

  color: ${props =>
    props.reverse
      ? props.theme.colors.contrastColor
      : props.theme.colors.background1};
`;
