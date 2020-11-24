import styled, {css} from '@emotion/native';

export const OptionHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  ${(props) =>
    props.active &&
    `background: ${props.theme.colors.secondary.normal20Opacity};`}
  border: 1px solid ${(props) => props.theme.colors.background2};
`;

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 48px;
  ${(props) =>
    props.active &&
    `background: ${props.theme.colors.secondary.normal20Opacity};`}
`;

export const RightSide = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OptionsContainer = styled.View`
  height: ${(props) => (props.expand ? 'auto' : '0')};
  overflow: hidden;
`;

export const headerLabelStyle = (theme, active) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  ${active && `color: ${theme.colors.secondary.dark};`}
`;
export const labelStyle = (theme, active) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  ${active && `color: ${theme.colors.secondary.dark};`}
  margin-left: 16px;
`;
