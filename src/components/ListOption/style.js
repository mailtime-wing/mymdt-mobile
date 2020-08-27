import styled, {css} from '@emotion/native';

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`;

export const RightSide = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Margin = styled.View`
  margin-right: 16px;
`;

export const listLabel = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const listValue = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;
