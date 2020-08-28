import styled, {css} from '@emotion/native';

export const TransactionContainer = styled.View`
  flex: 3;
  justify-content: center;
  margin-left: 16px;
  margin-right: 16px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  padding: 12px 0;
`;

export const nameStyle = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const dateStyle = theme => css`
  color: ${theme.colors.textOnBackground.disabled};
`;
