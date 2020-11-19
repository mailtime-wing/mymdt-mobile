import React from 'react';
import {View} from 'react-native';

import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';

import {USD} from '@/constants/currency';

import convertToUsdAmount from '@/utils/convertToUsdAmount';

import {container, header, center} from './style';

// TODO: add tag payout when related commit merged
// TODO: add recent transaction when related commit merged

const NextStakeReward = ({style}) => {
  const theme = useTheme();
  const nextStakeAmount = 1000;
  return (
    <View style={[container(theme), style]}>
      <AppText variant="heading6" style={header(theme)}>
        Next Stake Reward
      </AppText>
      <TransactionAmount
        amount={nextStakeAmount}
        amountSizeVariant="largeProportional"
        amountColor={theme.colors.textOnBackground.mediumEmphasis}
        unitVariant="MM"
        unitColor={theme.colors.secondary.dark}
        style={center}
      />
      <TransactionAmount
        amount={convertToUsdAmount(nextStakeAmount)}
        amountSizeVariant="small"
        unitSizeVariant="small"
        unitVariant={USD}
        showDollarSign
        showAlmostEqual
        unitColor={theme.colors.textOnThemeBackground.mediumEmphasis}
        amountColor={theme.colors.textOnThemeBackground.mediumEmphasis}
        style={center}
      />
    </View>
  );
};

export default NextStakeReward;
