import {css} from '@emotion/native';
import {MEASURABLE_DATA_TOKEN, REWARD_DOLLAR, ME} from '@/constants/currency';

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
      unitVariant === REWARD_DOLLAR &&
      `
        color: ${theme.colors.secondary.normal};
      `
    }
    ${
      unitVariant === ME &&
      `
        color: ${theme.colors.secondary.normal};
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
      unitVariant === REWARD_DOLLAR &&
      `
        color: ${theme.colors.secondary.normal};
      `
    }
    ${
      unitVariant === ME &&
      `
        color: ${theme.colors.secondary.normal};
      `
    }
  `}
`;

export const container = css`
  margin: auto 0;
  flex-direction: row;
  align-items: baseline;
`;
