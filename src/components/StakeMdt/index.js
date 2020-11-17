import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedDate} from 'react-intl';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import TransactionAmount from '@/components/TransactionAmount';

import {
  mediumEmphasis,
  rowContainer,
  stakeSummary,
  mdtTextColor,
  summaryItem,
  stakeButton,
} from './style';

const StakeMdt = ({
  stakingPlan: {stakingInterestRate, lockupPeriodInDay},
  remainingUnstakeAmount,
  stakeDate,
  expectedAvailableDate,
  onConfirmStakePress,
}) => {
  const theme = useTheme();

  return (
    <View>
      <View style={stakeSummary(theme)}>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            Annual Percentage Yield
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            {stakingInterestRate}%
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            Stake Period
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            {lockupPeriodInDay} days
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            Stake Date
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            <FormattedDate value={stakeDate} />
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            Expected Available Date
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            <FormattedDate value={expectedAvailableDate} />
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            Remaining Available MDT
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            <TransactionAmount
              amount={remainingUnstakeAmount}
              unitSizeVariant="small"
              amountSizeVariant="small"
              unitVariant="MDT"
              unitColor={theme.colors.textOnBackground.mediumEmphasis}
              amountColor={theme.colors.textOnBackground.mediumEmphasis}
            />
          </AppText>
        </View>
      </View>
      <AppButton
        onPress={onConfirmStakePress}
        variant="filled"
        sizeVariant="large"
        colorVariant="primary"
        text="confirm stake"
        style={stakeButton}
      />
    </View>
  );
};

StakeMdt.defaultProps = {
  stakingPlan: {
    stakingInterestRate: 0,
    lockupPeriodInDay: 0,
  },
};

export default StakeMdt;
