import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedDate} from 'react-intl';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import TransactionAmount from '@/components/TransactionAmount';
import {FormattedMessage} from 'react-intl';

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
            <FormattedMessage
              id="annual_percentage_yield"
              defaultMessage="Annual Percentage Yield"
            />
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            {stakingInterestRate}%
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            <FormattedMessage id="stake_period" defaultMessage="Stake Period" />
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            <FormattedMessage
              id="number_of_days"
              defaultMessage="{day} days"
              values={{
                day: lockupPeriodInDay,
              }}
            />
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            <FormattedMessage id="stake_date" defaultMessage="Stake Date" />
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            <FormattedDate value={stakeDate} />
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            <FormattedMessage
              id="expected_available_date"
              defaultMessage="Expected Available Date"
            />
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            <FormattedDate value={expectedAvailableDate} />
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            <FormattedMessage
              id="remaining_available_mdt"
              defaultMessage="Remaining Available MDT"
            />
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
