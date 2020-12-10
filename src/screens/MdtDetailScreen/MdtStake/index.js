import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';
import AppTag from '@/components/AppTag';
import {USD, MEASURABLE_DATA_TOKEN, ME} from '@/constants/currency';
import useCurrencyConvertToUsd from '@/hooks/useCurrencyConvertToUsd';
import LockIcon from '@/assets/icon_lock.svg';
import getDaysBetween from '@/utils/getDaysBetween';

import {
  container,
  header,
  center,
  tag,
  diviver,
  summary,
  summaryHeader,
  percentage as percentageStyle,
  rowContainer,
  payout,
} from './style';

const MdtStake = ({
  style,
  mdtStakeAmount,
  stakeDate,
  lockupPeriodInDay,
  paPercentage,
  accuredRewardAmount,
  nextPayoutDate,
  cumulativeRewardAmount,
  availableMdt,
}) => {
  const theme = useTheme();
  const {conversionRate} = useCurrencyConvertToUsd(MEASURABLE_DATA_TOKEN);

  const now = new Date();

  const stakeDateInDate = new Date(stakeDate);
  stakeDateInDate.setDate(stakeDateInDate.getDate() + lockupPeriodInDay);
  let unstakeInDays = getDaysBetween(now, stakeDateInDate);
  unstakeInDays = unstakeInDays < 0 ? 0 : unstakeInDays;

  let payoutInDays = getDaysBetween(now, new Date(nextPayoutDate));
  payoutInDays = payoutInDays < 0 ? 0 : payoutInDays;

  return (
    <View style={[container(theme), style]}>
      <AppText variant="heading6" style={header(theme)}>
        <FormattedMessage id="mdt_stake" defaultMessage="MDT Stake" />
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
        amount={mdtStakeAmount * conversionRate}
        amountSizeVariant="small"
        unitSizeVariant="small"
        unitVariant={USD}
        showDollarSign
        showAlmostEqual
        unitColor={theme.colors.textOnBackground.mediumEmphasis}
        amountColor={theme.colors.textOnBackground.mediumEmphasis}
        style={center}
      />
      <AppTag
        style={tag}
        variant="transparent"
        sizeVariant="normal"
        colorVariant="primary"
        text={
          <FormattedMessage
            id="unstake_in_days"
            values={{day: unstakeInDays}}
          />
        }
        svgIcon={LockIcon}
      />
      <View style={summary(theme)}>
        <View style={rowContainer}>
          <AppText variant="subTitle3" style={summaryHeader(theme)}>
            <FormattedMessage
              id="annual_percentage_yield"
              defaultMessage="Annual Percentage Yield"
            />
          </AppText>
          <AppText variant="body2" style={percentageStyle(theme)}>
            {paPercentage}%
          </AppText>
        </View>
        <View style={rowContainer}>
          <View>
            <AppText variant="subTitle3" style={summaryHeader(theme)}>
              <FormattedMessage
                id="accured_reward"
                defaultMessage="Accured Reward"
              />
            </AppText>
            {
              // TODO: change to smallText when related commit merge
              <AppText variant="subTitle3" style={payout(theme)}>
                <FormattedMessage
                  id="payout_in_days"
                  defaultMessage="Payout in {day} days"
                  values={{day: payoutInDays}}
                />
              </AppText>
            }
          </View>
          <TransactionAmount
            amount={accuredRewardAmount}
            amountSizeVariant="normal"
            unitSizeVariant="small"
            unitVariant={ME}
            unitColor={theme.colors.secondary.dark}
            amountColor={theme.colors.textOnBackground.mediumEmphasis}
          />
        </View>
        <View style={rowContainer}>
          <AppText variant="subTitle3" style={summaryHeader(theme)}>
            <FormattedMessage
              id="cumulative_reward"
              defaultMessage="Cumulative Reward"
            />
          </AppText>
          <TransactionAmount
            amount={cumulativeRewardAmount}
            amountSizeVariant="normal"
            unitSizeVariant="small"
            unitVariant={ME}
            unitColor={theme.colors.secondary.dark}
            amountColor={theme.colors.textOnBackground.mediumEmphasis}
          />
        </View>
      </View>
      <View style={diviver(theme)} />

      <AppText variant="heading6" style={header(theme)}>
        <FormattedMessage id="available" defaultMessage="Available" />
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
        amount={availableMdt * conversionRate}
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
