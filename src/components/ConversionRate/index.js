import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';
import AppText from '@/components/AppText2';

import {REWARD_DOLLAR, MEASURABLE_DATA_TOKEN} from '@/constants/currency';

import {almostEqualSymbol, container} from './style';

const TransactionCoin = ({type, amount}) => {
  const theme = useTheme();
  if (type === REWARD_DOLLAR) {
    return (
      <MRPCoin
        amount={amount}
        size={16}
        fontSize={16}
        color={theme.colors.textOfMrp}
      />
    );
  }

  if (type === MEASURABLE_DATA_TOKEN) {
    return (
      <MDTCoin
        amount={amount}
        size={16}
        fontSize={16}
        color={theme.colors.textOfMdt}
      />
    );
  }

  return null;
};

const ConversionRate = ({conversionRate, from, to}) => {
  const theme = useTheme();

  return (
    <View style={container}>
      <TransactionCoin type={from} amount={1} />
      <AppText variant="body2" style={almostEqualSymbol(theme)}>
        ≈
      </AppText>
      <TransactionCoin type={to} amount={conversionRate} />
    </View>
  );
};

export default ConversionRate;
