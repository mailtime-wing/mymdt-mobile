import {css} from '@emotion/native';
import {
  MEASURABLE_DATA_TOKEN,
  MEASURABLE_REWARD_POINT,
  MM,
} from '@/constants/currency';

export const amount = (theme, variant, unitVariant, amountSizeVariant) => css`
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
      unitVariant === MM &&
      `
        color: cyan;
      `
    }
  `}

  margin-right: 4px;
  ${amountSizeVariant === 'large' && 'margin-right: 8px;'}
`;

export const unit = (theme, variant, unitVariant) => css`
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
      unitVariant === MM &&
      `
        color: cyan;
      `
    }
  `}
`;

export const container = css`
  margin: auto 0;
  flex-direction: row;
  align-items: baseline;
`;
