import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondary.normal};
  opacity: ${(props) => props.disabled && '0.5'};

  text-transform: uppercase;
  justify-content: center;

  padding: 20px 24px;
  border-radius: 42px;
  min-width: 64px; /* for chinese character ui*/

  ${(props) =>
    props.small &&
    `padding: 4px 8px;
    `}
  ${(props) =>
    props.medium &&
    `padding: 10px 12px;
    `}
  ${(props) => props.width && `width: ${props.width}; align-self: center;`}
  ${(props) =>
    props.reverse &&
    `background-color: ${props.theme.colors.background1}; border: 1px solid ${props.theme.colors.secondary.normal20Opacity};`}
    
  ${(props) =>
    props.reverseBorder &&
    `border: 1px solid ${props.theme.colors.background1};`}
`;

export const ButtonText = styled(Text)`
  color: ${(props) => props.theme.colors.background1};
  letter-spacing: 1.5px;
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;

  color: ${(props) =>
    props.reverse
      ? props.theme.colors.secondary.normal
      : props.theme.colors.background1};
`;
