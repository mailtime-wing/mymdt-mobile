import {css} from '@emotion/native';

export const container = (theme, variant, sizeVariant, colorVariant) => css`
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  ${variant === 'normal' &&
  `
    ${
      colorVariant === 'primary' &&
      `
    background-color: ${theme.colors.tag.primary.background.normal};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
    background-color: ${theme.colors.tag.secondary.background.normal};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      background-color: ${theme.colors.tag.contrast.background.normal};
    `
    }
    ${
      colorVariant === 'onBackground' &&
      `
      background-color: ${theme.colors.tag.onBackground.background.normal};
    `
    }
  `}
  ${variant === 'transparent' &&
  `
    ${
      colorVariant === 'primary' &&
      `
      
      background-color: ${theme.colors.tag.primary.background.transparent};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      
      background-color: ${theme.colors.tag.secondary.background.transparent};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      
      background-color: ${theme.colors.tag.contrast.background.transparent};
    `
    }
    ${
      colorVariant === 'onBackground' &&
      `
      background-color: ${theme.colors.tag.onBackground.background.transparent};
    `
    }
    ${
      colorVariant === 'error' &&
      `
      background-color: ${theme.colors.errorBackground};
    `
    }
  `}
  padding-horizontal: 8px;

  ${sizeVariant === 'normal' &&
  `
  padding-vertical: 4.5px;
    `}
`;

export const text = (theme, variant, colorVariant) => css`
  ${variant === 'normal' &&
  `
    ${
      colorVariant === 'primary' &&
      `
    color: ${theme.colors.tag.primary.text.normal};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
    color: ${theme.colors.tag.secondary.text.normal};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      color: ${theme.colors.tag.contrast.text.normal};
    `
    }
    ${
      colorVariant === 'onBackground' &&
      `
      color: ${theme.colors.tag.onBackground.text.normal};
    `
    }
  `}
  ${variant === 'transparent' &&
  `
    ${
      colorVariant === 'primary' &&
      `
      
      color: ${theme.colors.tag.primary.text.transparent};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      
      color: ${theme.colors.tag.secondary.text.transparent};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      
      color: ${theme.colors.tag.contrast.text.transparent};
    `
    }
    ${
      colorVariant === 'onBackground' &&
      `
      color: ${theme.colors.tag.onBackground.text.transparent};
    `
    }
    ${
      colorVariant === 'error' &&
      `
      color: ${theme.colors.textOnError.normal};
    `
    }
  `}
`;

export const icon = (theme, variant, colorVariant, haveText) => css`
  ${haveText && 'margin-right: 4px;'}
  width: 16px;
  height: 16px;

  ${variant === 'normal' &&
  `
    ${
      colorVariant === 'primary' &&
      `
      fill: ${theme.colors.tag.primary.text.normal};
      stroke: ${theme.colors.tag.primary.text.normal};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      fill: ${theme.colors.tag.secondary.text.normal};
      stroke: ${theme.colors.tag.secondary.text.normal};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      fill: ${theme.colors.tag.contrast.text.normal};
      stroke: ${theme.colors.tag.contrast.text.normal};
    `
    }
    ${
      colorVariant === 'onBackground' &&
      `
      fill: ${theme.colors.tag.onBackground.text.normal};
      stroke: ${theme.colors.tag.onBackground.text.normal};
    `
    }
    `}
  ${variant === 'transparent' &&
  `
    ${
      colorVariant === 'primary' &&
      `
      fill: ${theme.colors.tag.primary.text.transparent};
      stroke: ${theme.colors.tag.primary.text.transparent};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      fill: ${theme.colors.tag.secondary.text.transparent};
      stroke: ${theme.colors.tag.secondary.text.transparent};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      fill: ${theme.colors.tag.contrast.text.transparent};
      stroke: ${theme.colors.tag.contrast.text.transparent};
    `
    }
    ${
      colorVariant === 'onBackground' &&
      `
      fill: ${theme.colors.tag.onBackground.text.transparent};
      stroke: ${theme.colors.tag.onBackground.text.transparent};
    `
    }
    ${
      colorVariant === 'error' &&
      `
      fill: ${theme.colors.textOnError.normal};
      stroke: ${theme.colors.textOnError.normal};
    `
    }
  `}
`;
