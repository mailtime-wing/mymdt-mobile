import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {
  progressTitleStyle,
  progressLabelStyle,
  upperSectionContainer,
  lowerSectionContainer,
  sectionTitle,
  sectionDetail,
  marginTop,
  browseMembership,
  giftsContainer,
  giftContainer,
  giftName,
  giftNameContainer,
  rowContainer,
} from './style';
import ArrowIcon from '@/assets/list_arrow.svg';
import GiftIcon from '@/assets/rewardme_gift.svg';
import AppText from '@/components/AppText2';
import ProgressBar from '@/components/ProgressBar';
import MRPCoin from '@/components/MRPCoin';
import AppButton from '@/components/AppButton';

const giftList = [
  {
    name: 'Birthday Gift',
  },
  {
    name: '1 + Special Offer',
  },
  {
    name: 'Netflix Free 1 Month',
  },
];

const UpgradeSection = ({userNextLevel}) => {
  const theme = useTheme();
  const canUpgrade = false; // from api later
  // TODO: handle update ui when have api

  return (
    <>
      <View
        style={[
          css`
            ${theme.colors.elevatedBackground1}
          `,
          upperSectionContainer,
        ]}>
        <AppText variant="heading5" style={sectionTitle(theme)}>
          <FormattedMessage
            id="upgrade_to"
            defaultMessage="Upgrade to {nextLevel}"
            values={{
              nextLevel: (
                <FormattedMessage id={`membership_level_${userNextLevel}`} />
              ),
            }}
          />
        </AppText>
        <AppText variant="body2" style={sectionDetail(theme)}>
          <FormattedMessage id="complete_tasks_to_upgrade" />
        </AppText>
        <ProgressBar
          title={
            <AppText variant="body2" style={progressTitleStyle(theme)}>
              <FormattedMessage id="referral" />
            </AppText>
          }
          progressLabel={
            <AppText variant="caption" style={progressLabelStyle(theme)}>
              20/50
            </AppText>
          }
          progress={20 / 50}
        />
        <ProgressBar
          title={
            <AppText variant="body2" style={progressTitleStyle(theme)}>
              <FormattedMessage id="total_reward_points" />
            </AppText>
          }
          progressLabel={
            <View style={rowContainer}>
              <MRPCoin
                amount={14546}
                size={12}
                fontSize={12}
                color={theme.colors.textOnBackground.mediumEmphasis}
              />
              <AppText variant="caption" style={progressLabelStyle(theme)}>
                /<FormattedNumber value={20000} />
              </AppText>
            </View>
          }
          progress={14565 / 20000}
        />
        {canUpgrade && (
          <AppButton
            variant="filled"
            sizeVariant="normal"
            colorVariant="secondary"
            text={<FormattedMessage id="upgrade_now" />}
          />
        )}
        <AppText variant="body2" style={[sectionDetail(theme), marginTop]}>
          <FormattedMessage id="enjoy_more_after_updrade" />
        </AppText>
        <View style={giftsContainer}>
          {giftList.map(({name}) => (
            <TouchableOpacity style={giftContainer}>
              <GiftIcon />
              <View style={giftNameContainer}>
                <AppText variant="caption" style={giftName(theme)}>
                  {name}
                </AppText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={[
          css`
            ${theme.colors.elevatedBackground1}
          `,
          lowerSectionContainer(theme),
        ]}>
        <AppText variant="caption" style={[browseMembership(theme)]}>
          <FormattedMessage id="browse_membership_details" />
        </AppText>
        <ArrowIcon />
      </TouchableOpacity>
    </>
  );
};

export default UpgradeSection;
