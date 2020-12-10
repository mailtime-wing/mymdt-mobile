import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';
import AppTag from '@/components/AppTag';
import {USD, ME} from '@/constants/currency';
import useCurrencyConvertToUsd from '@/hooks/useCurrencyConvertToUsd';
import getDaysBetween from '@/utils/getDaysBetween';

import {container, header, center, tag} from './style';

const NextStakeReward = ({style, accuredRewardAmount, nextPayoutDate}) => {
  const theme = useTheme();
  const {conversionRate} = useCurrencyConvertToUsd(ME);

  let payoutInDays = getDaysBetween(new Date(), new Date(nextPayoutDate));
  payoutInDays = payoutInDays < 0 ? 0 : payoutInDays;

  return (
    <View style={[container(theme), style]}>
      <AppText variant="heading6" style={header(theme)}>
        <FormattedMessage
          id="next_stake_reward"
          defaultMessage="Next Stake Reward"
        />
      </AppText>
      <TransactionAmount
        amount={accuredRewardAmount}
        amountSizeVariant="largeProportional"
        amountColor={theme.colors.textOnBackground.mediumEmphasis}
        unitVariant={ME}
        unitColor={theme.colors.secondary.dark}
        style={center}
      />
      <TransactionAmount
        amount={accuredRewardAmount * conversionRate}
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
        colorVariant="secondary"
        text={
          <FormattedMessage
            id="payout_in_days"
            defaultMessage="Payout in {day} days"
            values={{day: payoutInDays}}
          />
        }
      />
    </View>
  );
};

export default NextStakeReward;
