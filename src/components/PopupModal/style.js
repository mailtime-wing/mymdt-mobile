import styled, {css} from '@emotion/native';

export const titleStyle = theme => css`
  color: ${theme.colors.contrastColor};
`;

export const detailStyle = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00000044;
`;

export const buttonsContainer = css`
  flex-direction: row;
  align-self: center;
`;

export const marginRight = css`
  margin-right: 8px;
`;

export const modalView = css`
  width: 90%;
  justify-content: center;
  border-radius: 24px;
  padding: 24px;
`;
