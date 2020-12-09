import React from 'react';
import {View} from 'react-native';
import {FormattedNumber} from 'react-intl';
import AppText from '@/components/AppText2';

import {
  MEASURABLE_DATA_TOKEN,
  REWARD_DOLLAR,
  ME,
  USD,
  USDT,
} from '@/constants/currency';

import {amount as amountStyle, container, unit as unitStyle} from './style';
import {useTheme} from 'emotion-theming';

/**
 * @typedef {Object} Props
 * @property {MEASURABLE_DATA_TOKEN|REWARD_DOLLAR|ME|USD} unitVariant
 * @property {'from'|'to'} variant
 * @property {'small'|'normal'} unitSizeVariant
 * @property {'small'|'normal'|'large'|'largeProportional'} amountSizeVariant
 * @property {string} amountColor
 * @property {string} unitColor
 * @property {boolean} showDollarSign
 * @property {boolean} showAlmostEqual
 * @property {boolean} showDecimal
 * @property {boolean} showPositiveSign
 * @property {number} minimumFractionDigits
 * @property {number} maximumFractionDigits
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */
const TransactionAmount = ({
  amount,
  variant,
  unitVariant,
  unitSizeVariant,
  unitColor,
  amountColor,
  amountSizeVariant,
  showDollarSign,
  showAlmostEqual,
  showDecimal,
  showPositiveSign,
  minimumFractionDigits,
  maximumFractionDigits,
  style,
}) => {
  const theme = useTheme();

  let unit = '';
  let unitTextVariant = '';
  let amountTextVariant = '';

  switch (unitVariant) {
    case MEASURABLE_DATA_TOKEN:
      unit = 'MDT';
      minimumFractionDigits = 4;
      maximumFractionDigits = 4;
      break;
    case REWARD_DOLLAR:
      unit = 'R';
      break;
    case ME:
      unit = ME;
      minimumFractionDigits = 4;
      maximumFractionDigits = 4;
      break;
    case USD:
    case USDT:
      unit = 'USD';
      break;
    default:
      break;
  }

  switch (unitSizeVariant) {
    case 'small':
      unitTextVariant = 'unit11';
      break;
    case 'normal':
      unitTextVariant = 'unit16';
      break;
    default:
      break;
  }

  switch (amountSizeVariant) {
    case 'small':
      amountTextVariant = 'digit12mono';
      break;
    case 'normal':
      amountTextVariant = 'digit16mono';
      break;
    case 'large':
      amountTextVariant = 'digit36mono';
      break;
    case 'largeProportional':
      amountTextVariant = 'digit36';
      break;
    default:
      break;
  }

  return (
    <View style={[container, style]}>
      {(showAlmostEqual || showDollarSign) && (
        <AppText
          variant={amountTextVariant}
          style={[
            amountStyle(theme, variant, unitVariant, amountSizeVariant),
            amountColor && {color: amountColor},
          ]}>
          {showAlmostEqual && '≈'}
          {showDollarSign && '$'}
        </AppText>
      )}
      <AppText
        variant={amountTextVariant}
        style={[
          amountStyle(theme, variant, unitVariant, amountSizeVariant),
          amountColor && {color: amountColor},
        ]}>
        {showPositiveSign && amount >= 0 && '+'}
        <FormattedNumber
          value={amount}
          minimumFractionDigits={showDecimal ? minimumFractionDigits : 0}
          maximumFractionDigits={showDecimal ? maximumFractionDigits : 0}
        />
      </AppText>
      <AppText
        variant={unitTextVariant}
        style={[
          unitStyle(theme, variant, unitVariant),
          unitColor && {color: unitColor},
        ]}>
        {unit}
      </AppText>
    </View>
  );
};

TransactionAmount.defaultProps = {
  amountSizeVariant: 'normal',
  unitSizeVariant: 'normal',
  showDecimal: true,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export default TransactionAmount;
