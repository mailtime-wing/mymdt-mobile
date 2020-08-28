import styled, {css} from '@emotion/native';

export const Container = styled.View`
  flex: 3;
  justify-content: center;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  padding: 12px 0;
`;

export const MarginLeft = styled.View`
  margin-left: 8px;
`;

export const taskName = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const claimedDateStyle = theme => css`
  color: ${theme.colors.textOnBackground.disabled};
`;
