import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import {GET_CONVERSION_RATE_API} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';

import {convertedText, gotRewardText, convertedContainer} from './style';

import {REWARD_DOLLAR, MEASURABLE_DATA_TOKEN} from '@/constants/currency';

import MRPCoin from '@/components/MRPCoin';
import MDTCoin from '@/components/MDTCoin';
import MRPGiftBox from '@/components/MRPGiftBox';
import MDTGiftBox from '@/components/MDTGiftBox';
import AppText from '@/components/AppText2';
import PopupModalWithLinearGradient from '@/components/PopupModalWithLinearGradient';

const giftBoxStyle = {
  transform: [
    {
      scale: 0.75,
    },
  ],
};

const RewardGotPopup = ({
  convert,
  rewardName,
  rewardAmount,
  onOkPress,
  ...props
}) => {
  const theme = useTheme();

  // only call when convert to mdt
  const {data} = useQueryWithAuth(GET_CONVERSION_RATE_API, {
    skip: !convert || rewardAmount === 0,
    variables: {
      from: REWARD_DOLLAR,
      to: MEASURABLE_DATA_TOKEN,
    },
  });

  const conversionRate = data?.conversionRate || 0;
  const convertedMdtAmount = rewardAmount * conversionRate;
  const mrpTextColor = theme.colors.textOfMrp;
  const mdtTextColor = theme.colors.textOfMdt;

  return (
    <PopupModalWithLinearGradient callback={onOkPress} {...props}>
      {convert ? (
        <MDTGiftBox style={giftBoxStyle} />
      ) : (
        <MRPGiftBox style={giftBoxStyle} />
      )}
      <AppText
        variant="heading4"
        style={gotRewardText(theme, convert ? mdtTextColor : mrpTextColor)}>
        <FormattedMessage
          id="you_got_reward"
          values={{
            reward_type: rewardName,
          }}
        />
      </AppText>
      {convert ? (
        <MDTCoin
          amount={convertedMdtAmount}
          size={28}
          fontSize={24}
          color={mdtTextColor}
        />
      ) : (
        <MRPCoin
          amount={rewardAmount}
          size={28}
          fontSize={24}
          color={mrpTextColor}
        />
      )}
      {convert && (
        <View style={convertedContainer}>
          <AppText variant="body2" style={convertedText(theme)}>
            <FormattedMessage id="converted_from" />{' '}
          </AppText>
          <MRPCoin
            amount={rewardAmount}
            size={16}
            fontSize={16}
            color={mrpTextColor}
          />
        </View>
      )}
    </PopupModalWithLinearGradient>
  );
};

RewardGotPopup.defaultProps = {
  convert: false,
  rewardName: <FormattedMessage id="reward_type_default" />,
  rewardAmount: 0,
};

export default RewardGotPopup;
