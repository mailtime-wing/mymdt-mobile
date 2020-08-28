import styled, {css} from '@emotion/native';

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
  align-items: center;
`;

export const rowTextStyle = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;
