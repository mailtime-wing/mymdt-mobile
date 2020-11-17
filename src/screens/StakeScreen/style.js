import {css} from '@emotion/native';

export const marginTop = css`
  margin-top: 40px;
`;

export const stakeAmount = (theme) => css`
  color: ${theme.colors.primary.normal};
  text-align: center;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const center = css`
  justify-content: center;
  align-self: center;
`;

export const icon = css`
  margin-top: 24px;
`;

export const sectionContainer = (theme) => css`
  ${theme.colors.elevatedBackground3}
  margin-vertical: 16px;
  padding: 24px;
  padding-top: 16px;
  border-radius: 24px;
  shadow-opacity: 0;
`;

export const lowerHalfSectionContainer = (theme) => css`
  padding: 24px;
  padding-top: 40px;
  ${theme.colors.elevatedBackground3}
  border-top-width: 0;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export const availableMdtContainer = (theme) => css`
  border-width: 1px;
  border-color: ${theme.colors.background3};
  border-radius: 24px;
  padding: 8px;
`;
