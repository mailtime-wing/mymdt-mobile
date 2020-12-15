import {css} from '@emotion/native';
import {transparentize} from 'polished';

export const layout = css`
  padding-top: 16px;
  align-items: center;
`;

export const icons = css`
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

export const circleBackground = css`
  justify-content: center;
  align-items: center;
  height: 42px;
  width: 42px;
  border-radius: 21px;
`;

export const iconShadow = css`
  background-color: transparent;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

export const dashDot = (theme) => css`
  height: 4px;
  width: 4px;
  border-radius: 2px;
  background-color: ${theme.colors.secondary.normal20Opacity};
  margin-horizontal: 2px;
`;

export const logoPosition = css`
  position: absolute;
  align-items: center;
  top: 14;
  left: 0;
  right: 0;
  background-color: transparent;
`;

export const title = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  text-align: center;
  margin-bottom: 40px;
`;

export const descriptionBoxContainer = (theme) => css`
  align-self: stretch;
  background-color: ${theme.colors.detailBox.secondary};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 40px;
`;

export const descriptionLineContainer = css`
  flex-direction: row;
`;

export const descriptionLineTexts = css`
  margin-left: 16px;
`;

export const descriptionLineTitle = (theme) => css`
  margin-bottom: 8px;
  color: ${transparentize(0.2, theme.colors.contrastColor)};
`;

export const descriptionLineCaption = (theme) => css`
  color: ${transparentize(0.6, theme.colors.contrastColor)};
`;

export const descriptionLineSeparator = css`
  margin-vertical: 12px;
`;

export const button = css`
  align-self: stretch;
`;
