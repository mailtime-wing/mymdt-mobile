import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';

import StarIcon from '@/assets/icon_star.svg';

import {
  highEmphasis,
  privilege,
  rowContainer,
  container,
  star,
  disabled as disabledStyle,
} from './style';

const Privileges = ({
  cashbackPercentage,
  merchantsNumAllowed,
  stakingInterestRate,
  stakingLockupPeriodInDay,
  starColor,
  style,
}) => {
  const theme = useTheme();
  return (
    <View style={[container(theme), style]}>
      <AppText variant="label" style={privilege(theme)}>
        <FormattedMessage id="privileges" defaultMessage="Privileges" />
      </AppText>
      {cashbackPercentage && (
        <View style={rowContainer}>
          <StarIcon fill={starColor} style={star} />
          <AppText
            variant="body2"
            style={highEmphasis(theme)}
            numberOfLines={2}>
            <FormattedMessage
              id="cashback_percentage"
              defaultMessage="{percentage}% Cash Back"
              values={{
                percentage: cashbackPercentage,
              }}
            />
          </AppText>
        </View>
      )}
      {merchantsNumAllowed && (
        <View style={rowContainer}>
          <StarIcon fill={starColor} style={star} />
          <AppText
            variant="body2"
            style={highEmphasis(theme)}
            numberOfLines={2}>
            <FormattedMessage
              id="cashback_from_number_of_merchants"
              defaultMessage="Cash Back From {number} Merchants"
              values={{
                number: merchantsNumAllowed,
              }}
            />
          </AppText>
        </View>
      )}
      {stakingInterestRate && (
        <View style={rowContainer}>
          <StarIcon fill={starColor} style={star} />
          <View>
            <AppText
              variant="body2"
              style={highEmphasis(theme)}
              numberOfLines={2}>
              <FormattedMessage
                id="staking_interest_rate_percentage_return_in_new_token"
                defaultMessage="{percentage}% p.a. MDT Stake Rewards Return in {token} Token*"
                values={{
                  percentage: stakingInterestRate,
                  token: <FormattedMessage id="currencyDisplayCode.ME" />,
                }}
              />
            </AppText>
            <AppText variant="tinyText" style={disabledStyle(theme)}>
              <FormattedMessage
                id="require_staking_days"
                defaultMessage="Require Staking for {number_of_day} {number_of_day, plural, =0 {day} one {day} other {days}}"
                values={{
                  number_of_day: stakingLockupPeriodInDay,
                }}
              />
            </AppText>
          </View>
        </View>
      )}
    </View>
  );
};

export default Privileges;
