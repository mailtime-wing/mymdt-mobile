import {css} from '@emotion/native';
import {transparentize} from 'polished';

export const container = (
  theme,
  variant,
  sizeVariant,
  colorVariant,
  disabled,
) => css`
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  ${disabled && 'opacity: 0.4;'}

  ${variant === 'filled' &&
  `
    ${
      colorVariant === 'primary' &&
      `
    background-color: ${theme.colors.primary.normal};
    `
    }
    ${
      colorVariant === 'secondary' &&
      /* apply box-shadow only when
      1. colorVariant === 'secondary'
      2. sizeVariant === 'large'
      3. button enabled
    */
      `
    background-color: ${theme.colors.secondary.normal};
    ${
      !disabled &&
      sizeVariant === 'large' &&
      'box-shadow: 0px 4px 8px rgba(33, 206, 219, 0.2);'
    }
    `
    }
    ${
      colorVariant === 'alert' &&
      `
      background-color: ${theme.colors.textOnError.normal};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      background-color: ${theme.colors.background1};
    `
    }
  `}
  ${variant === 'outlined' &&
  `
      border-width: 1px;
    ${
      colorVariant === 'primary' &&
      `
      
      border-color: ${transparentize(0.8, theme.colors.primary.normal)};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      
      border-color: ${transparentize(0.8, theme.colors.secondary.normal)};
    `
    }
    ${
      colorVariant === 'alert' &&
      `
      
      border-color: ${transparentize(0.8, theme.colors.textOnError.normal)};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      border-color: ${theme.colors.buttonContrastBorderColor};
    `
    }
  `}

  ${sizeVariant === 'compact' &&
  `
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 8px;
    padding-right: 8px;
    `}
  ${sizeVariant === 'normal' &&
  `
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 12px;
    padding-right: 12px;
    `}
  ${sizeVariant === 'large' &&
  `
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  `}
`;

export const text = (theme, variant, colorVariant) => css`
  ${variant === 'filled' &&
  `
    ${
      colorVariant === 'primary' &&
      `
      color: ${theme.colors.background1};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      color: ${theme.colors.background1};
    `
    }
    ${
      colorVariant === 'alert' &&
      `
      color: ${theme.colors.background1};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      color: ${theme.colors.secondary.normal};
    `
    }
    `}
  ${(variant === 'outlined' || variant === 'transparent') &&
  `
    ${
      colorVariant === 'primary' &&
      `
      color: ${theme.colors.primary.normal};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      color: ${theme.colors.secondary.normal};
    `
    }
    ${
      colorVariant === 'alert' &&
      `
      color: ${theme.colors.textOnError.normal};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      color: ${theme.colors.buttonContrastTextColor};
    `
    }
    `}
`;

export const icon = (theme, variant, colorVariant, haveText) => css`
  ${haveText && 'margin-right: 8px;'}
  width: 18px;
  height: 18px;

  ${variant === 'filled' &&
  `
    ${
      colorVariant === 'primary' &&
      `
      fill: ${theme.colors.background1};
      stroke: ${theme.colors.background1};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      fill: ${theme.colors.background1};
      stroke: ${theme.colors.background1};
    `
    }
    ${
      colorVariant === 'alert' &&
      `
      fill: ${theme.colors.background1};
      stroke: ${theme.colors.background1};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      fill: ${theme.colors.secondary.normal};
      stroke: ${theme.colors.secondary.normal};
    `
    }
    `}
  ${(variant === 'outlined' || variant === 'transparent') &&
  `
    ${
      colorVariant === 'primary' &&
      `
      fill: ${theme.colors.primary.normal};
      stroke: ${theme.colors.primary.normal};
    `
    }
    ${
      colorVariant === 'secondary' &&
      `
      fill: ${theme.colors.secondary.normal};
      stroke: ${theme.colors.secondary.normal};
    `
    }
    ${
      colorVariant === 'alert' &&
      `
      fill: ${theme.colors.textOnError.normal};
      stroke: ${theme.colors.textOnError.normal};
    `
    }
    ${
      colorVariant === 'contrast' &&
      `
      fill: ${theme.colors.buttonContrastTextColor};
      stroke: ${theme.colors.buttonContrastTextColor};
    `
    }
  `}
`;
