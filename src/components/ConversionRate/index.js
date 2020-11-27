import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';

import {almostEqualSymbol, container} from './style';

const ConversionTransactionAmount = (props) => {
  const theme = useTheme();
  return (
    <TransactionAmount
      unitSizeVariant="small"
      amountSizeVariant="normal"
      unitColor={theme.colors.secondary.normal}
      amountColor={theme.colors.textOnBackground.mediumEmphasis}
      minimumFractionDigits={3}
      maximumFractionDigits={3}
      {...props}
    />
  );
};

const ConversionRate = ({conversionRate, from, to}) => {
  const theme = useTheme();

  return (
    <View style={container}>
      <ConversionTransactionAmount amount={1} unitVariant={from} />
      <AppText variant="body2" style={almostEqualSymbol(theme)}>
        ≈
      </AppText>
      <ConversionTransactionAmount amount={conversionRate} unitVariant={to} />
    </View>
  );
};

export default ConversionRate;
