import {css} from '@emotion/native';
import {
  MEASURABLE_DATA_TOKEN,
  MEASURABLE_REWARD_POINT,
  NEW_TOKEN,
} from '@/constants/currency';

export const amount = (
  theme,
  variant,
  unitVariant,
  amountColor,
  amountSizeVariant,
) => css`
  ${variant === 'from' &&
  `
  color: ${theme.colors.textOnError.normal};
  `}
  ${variant === 'to' &&
  `
    ${
      unitVariant === MEASURABLE_DATA_TOKEN &&
      `
        color: ${theme.colors.primary.normal};
      `
    }
    ${
      unitVariant === MEASURABLE_REWARD_POINT &&
      `
        color: ${theme.colors.secondary.normal};
      `
    }
    ${
      unitVariant === NEW_TOKEN &&
      `
        color: cyan;
      `
    }
  `}

  // optional
  ${amountColor && `color: ${amountColor};`}

  margin-right: 4px;
  ${amountSizeVariant === 'large' && 'margin-right: 8px;'}
`;

export const unit = (theme, variant, unitVariant, unitColor) => css`
  ${variant === 'from' &&
  `
  color: ${theme.colors.textOnError.normal};
  `}
  ${variant === 'to' &&
  `
    ${
      unitVariant === MEASURABLE_DATA_TOKEN &&
      `
        color: ${theme.colors.primary.normal};
      `
    }
    ${
      unitVariant === MEASURABLE_REWARD_POINT &&
      `
        color: ${theme.colors.secondary.normal};
      `
    }
    ${
      unitVariant === NEW_TOKEN &&
      `
        color: cyan;
      `
    }
  `}

  // optional
  ${unitColor && `color: ${unitColor};`}
`;

export const container = css`
  margin: auto 0;
  flex-direction: row;
  align-items: baseline;
`;
