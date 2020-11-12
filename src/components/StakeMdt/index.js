import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedDate} from 'react-intl';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import TransactionAmount from '@/components/TransactionAmount';

import {
  container,
  mediumEmphasis,
  rowContainer,
  stakeSummary,
  mdtTextColor,
  summaryItem,
  stakeButton,
} from './style';

const StakeMdt = ({stakeAmount, remainingUnstakeAmount, pa}) => {
  const theme = useTheme();
  return (
    <View style={container(theme)}>
      <View style={stakeSummary(theme)}>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="subTitle2" style={mdtTextColor(theme)}>
            Stake Amount
          </AppText>
          <AppText variant="digit16mono" style={mdtTextColor(theme)}>
            <TransactionAmount
              amount={stakeAmount}
              unitSizeVariant="small"
              unitVariant="MDT"
              variant="to"
              showDecimal={false}
            />
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            APY
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            {pa}%
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            Stake Date
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            <FormattedDate value={new Date()} />
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            Unstake Date
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            <FormattedDate value={new Date()} />
          </AppText>
        </View>
        <View style={[rowContainer, summaryItem]}>
          <AppText variant="smallText" style={mdtTextColor(theme)}>
            Remaining Unstake MDT
          </AppText>
          <AppText variant="caption" style={mediumEmphasis(theme)}>
            <TransactionAmount
              amount={remainingUnstakeAmount}
              unitSizeVariant="small"
              amountSizeVariant="small"
              unitVariant="MDT"
              unitColor={theme.colors.textOnBackground.mediumEmphasis}
              amountColor={theme.colors.textOnBackground.mediumEmphasis}
              showDecimal={false}
            />
          </AppText>
        </View>
      </View>
      <AppButton
        variant="filled"
        sizeVariant="large"
        colorVariant="primary"
        text="confirm stake"
        style={stakeButton}
      />
    </View>
  );
};

export default StakeMdt;
