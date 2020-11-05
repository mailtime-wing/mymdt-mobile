import React from 'react';
import {View} from 'react-native';

import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';

import {USD, MEASURABLE_DATA_TOKEN} from '@/constants/currency';

import convertToUsdAmount from '@/utils/convertToUsdAmount';

import {
  container,
  header,
  center,
  diviver,
  summary,
  summaryHeader,
  percentage as percentageStyle,
  rowContainer,
  payout,
} from './style';

// TODO: add tag payout when related commit merged
// TODO: add recent transaction when related commit merged

const MdtStake = ({
  style,
  paPercentage,
  accuredRewardAmount,
  cumulativeRewardAmount,
  availableMdt,
}) => {
  const theme = useTheme();
  const mdtStakeAmount = 100000;
  return (
    <View style={[container(theme), style]}>
      <AppText variant="heading6" style={header(theme)}>
        MDT Stake
      </AppText>
      <TransactionAmount
        amount={mdtStakeAmount}
        amountSizeVariant="largeProportional"
        amountColor={theme.colors.textOnBackground.mediumEmphasis}
        unitVariant={MEASURABLE_DATA_TOKEN}
        unitColor={theme.colors.primary.normal}
        style={center}
      />
      <TransactionAmount
        amount={convertToUsdAmount(mdtStakeAmount)}
        amountSizeVariant="small"
        unitSizeVariant="small"
        unitVariant={USD}
        showDollarSign
        showAlmostEqual
        unitColor={theme.colors.textOnBackground.mediumEmphasis}
        amountColor={theme.colors.textOnBackground.mediumEmphasis}
        style={center}
      />
      <View style={summary(theme)}>
        <View style={rowContainer}>
          <AppText variant="subTitle3" style={summaryHeader(theme)}>
            Annual Percentage Yield
          </AppText>
          <AppText variant="body2" style={percentageStyle(theme)}>
            {paPercentage}%
          </AppText>
        </View>
        <View style={rowContainer}>
          <View>
            <AppText variant="subTitle3" style={summaryHeader(theme)}>
              Accured Reward
            </AppText>
            {
              // TODO: change to smallText when related commit merge
              <AppText variant="subTitle3" style={payout(theme)}>
                Payout in 6 days
              </AppText>
            }
          </View>
          <TransactionAmount
            amount={accuredRewardAmount}
            amountSizeVariant="normal"
            unitSizeVariant="small"
            unitVariant="NT"
            unitColor={theme.colors.secondary.dark}
            amountColor={theme.colors.textOnBackground.mediumEmphasis}
          />
        </View>
        <View style={rowContainer}>
          <AppText variant="subTitle3" style={summaryHeader(theme)}>
            Cumulative Reward
          </AppText>
          <TransactionAmount
            amount={cumulativeRewardAmount}
            amountSizeVariant="normal"
            unitSizeVariant="small"
            unitVariant="NT"
            unitColor={theme.colors.secondary.dark}
            amountColor={theme.colors.textOnBackground.mediumEmphasis}
          />
        </View>
      </View>
      <View style={diviver(theme)} />

      <AppText variant="heading6" style={header(theme)}>
        Available
      </AppText>
      <TransactionAmount
        amount={availableMdt}
        amountSizeVariant="largeProportional"
        amountColor={theme.colors.textOnBackground.mediumEmphasis}
        unitVariant={MEASURABLE_DATA_TOKEN}
        unitColor={theme.colors.primary.normal}
        style={center}
      />
      <TransactionAmount
        amount={convertToUsdAmount(availableMdt)}
        amountSizeVariant="small"
        unitSizeVariant="small"
        unitVariant={USD}
        showDollarSign
        showAlmostEqual
        unitColor={theme.colors.textOnBackground.mediumEmphasis}
        amountColor={theme.colors.textOnBackground.mediumEmphasis}
        style={center}
      />
    </View>
  );
};

export default MdtStake;
