import styled, {css} from '@emotion/native';

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  align-items: center;
`;

export const removeText = (theme) => css`
  color: ${theme.colors.textOnError.normal};
`;

export const titleText = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const itemContainer = css`
  padding: 6px 24px;
  min-height: 48px;
`;

export const unbindButton = (theme) => css`
  border: 1px solid ${theme.colors.errorBackground};
  border-radius: 20px;
  padding: 8px;
  height: auto;
`;

export const addEmailButton = css`
  align-self: center;
`;
