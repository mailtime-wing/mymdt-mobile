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
 * @property {'small'|'normal'} sizeVariant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */
const TransactionAmount = ({
  amount,
  variant,
  unitVariant,
  sizeVariant,
  style,
}) => {
  const theme = useTheme();
  let unit = '';
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

  return (
    <View style={[container, style]}>
      <AppText
        variant="digit16mono"
        style={[amountStyle(theme, variant, unitVariant)]}>
        <FormattedNumber
          value={amount}
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </AppText>
      {sizeVariant === 'small' && (
        <AppText
          variant="unit11"
          style={unitStyle(theme, variant, unitVariant)}>
          {unit}
        </AppText>
      )}
      {sizeVariant === 'normal' && (
        <AppText
          variant="unit16"
          style={unitStyle(theme, variant, unitVariant)}>
          {unit}
        </AppText>
      )}
    </View>
  );
};

export default TransactionAmount;
