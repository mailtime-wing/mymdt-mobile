import React from 'react';
import {View} from 'react-native';
import {FormattedNumber} from 'react-intl';
import AppText from '@/components/AppText2';

import {
  MEASURABLE_DATA_TOKEN,
  REWARD_DOLLAR,
  ME,
  USD,
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
  style,
}) => {
  const theme = useTheme();

  let unit = '';
  let unitTextVariant = '';
  let amountTextVariant = '';

  switch (unitVariant) {
    case MEASURABLE_DATA_TOKEN:
      unit = 'MDT';
      break;
    case REWARD_DOLLAR:
      unit = 'R';
      break;
    case ME:
      unit = ME;
      break;
    case USD:
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
      <AppText
        variant={amountTextVariant}
        style={[
          amountStyle(theme, variant, unitVariant, amountSizeVariant),
          amountColor && {color: amountColor},
        ]}>
        {showAlmostEqual && '≈'}
        {showDollarSign && '$'}
      </AppText>
      <AppText
        variant={amountTextVariant}
        style={[
          amountStyle(theme, variant, unitVariant, amountSizeVariant),
          amountColor && {color: amountColor},
        ]}>
        <FormattedNumber
          value={amount}
          minimumFractionDigits={showDecimal ? 2 : 0}
          maximumFractionDigits={showDecimal ? 2 : 0}
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
};

export default TransactionAmount;
