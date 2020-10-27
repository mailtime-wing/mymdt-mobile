import React from 'react';
import {View} from 'react-native';
import {FormattedNumber} from 'react-intl';
import AppText from '@/components/AppText2';

import {
  MEASURABLE_DATA_TOKEN,
  MEASURABLE_REWARD_POINT,
  NEW_TOKEN,
} from '@/constants/currency';

import {amount as amountStyle, container, unit as unitStyle} from './style';
import {useTheme} from 'emotion-theming';

/**
 * @typedef {Object} Props
 * @property {MEASURABLE_DATA_TOKEN|MEASURABLE_REWARD_POINT|NEW_TOKEN} unitVariant
 * @property {'from'|'to'} variant
 * @property {'small'|'normal'} unitSizeVariant
 * @property {'small'|'normal'|'large'} amountSizeVariant
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
    case MEASURABLE_REWARD_POINT:
      unit = 'P';
      break;
    case NEW_TOKEN:
      unit = 'NT';
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
        <FormattedNumber
          value={amount}
          minimumFractionDigits={2}
          maximumFractionDigits={2}
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
};

export default TransactionAmount;
