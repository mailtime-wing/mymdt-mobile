import {css} from '@emotion/native';
import {transparentize} from 'polished';

export const layout = css`
  align-items: center;
`;

export const icons = css`
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

export const whiteCircle = css`
  justify-content: center;
  align-items: center;
  height: 42px;
  width: 42px;
  background-color: white;
  border-radius: 21px;
`;

export const iconShadow = css`
  shadow-color: #000000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3.84;
`;

export const dashDot = css`
  height: 4px;
  width: 4px;
  border-radius: 2px;
  background-color: rgba(33, 206, 219, 0.2);
  margin-horizontal: 2px;
`;

export const logoPosition = css`
  position: absolute;
  align-items: center;
  top: 14;
  left: 0;
  right: 0;
`;

export const title = css`
  text-align: center;
  margin-bottom: 40px;
`;

export const descriptionBoxContainer = theme => css`
  align-self: stretch;
  background-color: ${transparentize(0.9, theme.colors.secondary.normal)};
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

export const descriptionLineTitle = theme => css`
  margin-bottom: 8px;
  color: ${transparentize(0.2, theme.colors.contrastColor)};
`;

export const descriptionLineCaption = theme => css`
  color: ${transparentize(0.6, theme.colors.contrastColor)};
`;

export const descriptionLineSeparator = css`
  margin-vertical: 12px;
`;

export const button = css`
  align-self: stretch;
`;
