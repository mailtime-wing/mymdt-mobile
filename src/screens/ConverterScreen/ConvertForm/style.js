import {css} from '@emotion/native';

export const convertersContainer = css`
  justify-content: center;
  margin-bottom: 24px;
`;

export const converterContainer = (theme, isFocus) => css`
  flex: 1;
  border-radius: 8px;
  height: 120px;
  padding: 24px;
  border-radius: 24px;
  border: 1px solid ${theme.colors.background3};
  background-color: transparent;
  ${isFocus &&
  `border: 2px solid ${theme.colors.secondary.normal};
    background-color: ${theme.colors.inputFocusBackground};`};
`;

export const converterType = (theme, isFocus) => css`
  color: ${isFocus
    ? theme.colors.secondary.dark
    : theme.colors.textOnBackground.disabled};
  margin-bottom: 8px;
`;

export const toAmountText = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const input = (theme) => css`
  font-size: 36px;
  line-height: 44px;
  text-align: right;
  color: ${theme.colors.contrastColor};
`;

export const numberText = (theme) => css`
  flex: 1;
  text-align: right;
  color: ${theme.colors.textOnBackground.disabled};
`;

export const margin = css`
  margin-bottom: 16px;
`;

export const errorText = (theme) => css`
  color: ${theme.colors.textOnError.light};
`;

export const convertIcon = css`
  position: absolute;
  align-self: center;
`;

export const conversionSection = css`
  flex-direction: row;
  padding: 12px 0;
  margin: 24px 0;
  justify-content: space-between;
`;

export const leftContainer = css`
  flex-direction: column;
`;

export const conversionRateText = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const conversionUpdateDate = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;
