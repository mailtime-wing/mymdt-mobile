import {css} from '@emotion/native';

export const container = css`
  flex: 1;
`;

export const scrollInnerContainer = css`
  padding-left: 24px;
  padding-right: 24px;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 30px;
`;

export const hightLightText = (theme) => css`
  color: ${theme.colors.secondary.dark};
`;

export const fixedContainer = (theme) => css`
  border-width: 1px;
  border-radius: 24px 24px 0px 0px;
  border-color: ${theme.colors.borderColor};
  elevation: 1;
`;

export const fixedInnerContainer = (theme) => css`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 24px;
  padding-vertical: ${String(
    theme.space.marginBetweenContentAndScreenBottom,
  )}px;
`;

export const brandSelectedText = (theme, isError) => css`
  color: ${isError
    ? theme.colors.textOnError.normal
    : theme.colors.secondary.normal};
  text-align: left;
`;
