import {css} from '@emotion/native';

export const sectionContainer = theme => css`
  background-color: ${theme.colors.background1};
`;

export const upperSectionContainer = css`
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 24px;
`;

export const lowerSectionContainer = theme => css`
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.background2};
  padding: 8px;
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const sectionTitle = theme => css`
  color: ${theme.colors.secondary.normal};
`;

export const sectionDetail = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const progressTitleStyle = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const progressLabelStyle = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const marginTop = css`
  margin-top: 16px;
`;

export const browseMembership = theme => css`
  color: ${theme.colors.textOnBackground.disabled};
  text-align: center;
  margin-right: 8px;
`;

export const giftsContainer = css`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const giftContainer = css`
  flex: 1;
  border: 1px solid rgba(33, 206, 219, 0.16);
  border-radius: 16px;
  padding-top: 16px;
  padding-bottom: 8px;
  justify-content: center;
  align-items: center;
  max-width: 32%;
  min-height: 120px;
`;

export const giftName = theme => css`
  color: ${theme.colors.secondary.dark};
  text-align: center;
  margin-top: 8px;
`;

export const rowContainer = css`
  flex-direction: row;
`;
