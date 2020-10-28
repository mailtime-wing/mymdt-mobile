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
      colorVariant === 'theme' &&
      `
      background-color: ${theme.colors.tag.theme.background.normal};
    `
    }
  `}
  ${variant === 'opacity' &&
  `
    ${
      colorVariant === 'primary' &&
      `
      
      background-color: ${theme.colors.tag.primary.background.opacity};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      
      background-color: ${theme.colors.tag.secondary.background.opacity};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      
      background-color: ${theme.colors.tag.contrast.background.opacity};
    `
    }
    ${
      colorVariant === 'theme' &&
      `
      background-color: ${theme.colors.tag.theme.background.opacity};
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
      colorVariant === 'theme' &&
      `
      color: ${theme.colors.tag.theme.text.normal};
    `
    }
  `}
  ${variant === 'opacity' &&
  `
    ${
      colorVariant === 'primary' &&
      `
      
      color: ${theme.colors.tag.primary.text.opacity};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      
      color: ${theme.colors.tag.secondary.text.opacity};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      
      color: ${theme.colors.tag.contrast.text.opacity};
    `
    }
    ${
      colorVariant === 'theme' &&
      `
      color: ${theme.colors.tag.theme.text.opacity};
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
      stroke-width: 2;
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      fill: ${theme.colors.tag.secondary.text.normal};
      stroke: ${theme.colors.tag.secondary.text.normal};
      stroke-width: 2;
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      fill: ${theme.colors.tag.contrast.text.normal};
      stroke: ${theme.colors.tag.contrast.text.normal};
      stroke-width: 2;
    `
    }
    ${
      colorVariant === 'theme' &&
      `
      fill: ${theme.colors.tag.theme.text.normal};
      stroke: ${theme.colors.tag.theme.text.normal};
      stroke-width: 2;
    `
    }
    `}
  ${variant === 'opacity' &&
  `
    ${
      colorVariant === 'primary' &&
      `
      fill: ${theme.colors.tag.primary.text.opacity};
      stroke: ${theme.colors.tag.primary.text.opacity};
      stroke-width: 2;
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      fill: ${theme.colors.tag.secondary.text.opacity};
      stroke: ${theme.colors.tag.secondary.text.opacity};
      stroke-width: 2;
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      fill: ${theme.colors.tag.contrast.text.opacity};
      stroke: ${theme.colors.tag.contrast.text.opacity};
      stroke-width: 2;
    `
    }
    ${
      colorVariant === 'theme' &&
      `
      fill: ${theme.colors.tag.theme.text.opacity};
      stroke: ${theme.colors.tag.theme.text.opacity};
      stroke-width: 2;
    `
    }
  `}
`;
