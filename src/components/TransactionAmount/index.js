import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {FormattedNumber} from 'react-intl';
import AppText from '@/components/AppText2';

import {amount as amountStyle, container, unit as unitStyle} from './style';
import {useTheme} from 'emotion-theming';

/**
 * @typedef {Object} Props
 * @property {'mdt'|'rewardPoint'|'newToken'} unitVariant
 * @property {'from'|'to'} variant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */
const TransactionAmount = ({amount, variant, unitVariant, style, ...props}) => {
  const theme = useTheme();
  const [unit, setUnit] = useState('');

  useEffect(() => {
    if (unitVariant === 'MDT') {
      setUnit('MDT');
    }
    if (unitVariant === 'MRP') {
      setUnit('P');
    }
    if (unitVariant === 'newToken') {
      setUnit('NT');
    }
  }, [unitVariant]);

  return (
    <View style={[container, style]}>
      <AppText variant="digit16mono" style={[amountStyle(theme, variant)]}>
        <FormattedNumber
          value={amount}
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </AppText>
      <AppText variant="unit11" style={unitStyle(theme, variant)}>
        {unit}
      </AppText>
    </View>
  );
};

export default TransactionAmount;
