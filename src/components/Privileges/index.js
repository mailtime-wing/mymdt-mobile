import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';

import StarIcon from '@/assets/icon_star.svg';

import {highEmphasis, privilege, rowContainer, container, star} from './style';

const Privileges = ({
  cashbackPercentage,
  merchantsNumAllowed,
  stakingInterestRate,
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
            {cashbackPercentage}% Cash Back
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
            Cash Back From {merchantsNumAllowed} Merchants
          </AppText>
        </View>
      )}
      {stakingInterestRate && (
        <View style={rowContainer}>
          <StarIcon fill={starColor} style={star} />
          <AppText
            variant="body2"
            style={highEmphasis(theme)}
            numberOfLines={2}>
            {stakingInterestRate}% p.a. MDT Stake Rewards Return in New Token*
          </AppText>
        </View>
      )}
    </View>
  );
};

export default Privileges;
