import React from 'react';
import {View, SectionList} from 'react-native';
import {FormattedMessage, FormattedDate} from 'react-intl';
import {useTheme} from 'emotion-theming';
import AppText from '@/components/AppText2';
import AppAvator from '@/components/AppAvator';
import AppButton from '@/components/AppButton';
import TransactionAmount from '@/components/TransactionAmount';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_REFERRAL_STATUS} from '@/api/data';
import splitPhoneNumber from '@/utils/splitPhoneNumber';
import useMutationWithReset from '@/hooks/useMutationWithReset';
import {CLAIM_REWARD_API} from '@/api/data';
import RewardGotPopup from '@/components/RewardGotPopup';
import LoadingSpinner from '@/components/LoadingSpinner';

import {
  rewardContainer,
  contactContainer,
  nameStyle,
  numberStyle,
  statusStyle,
  sectionHeader,
  sectionHeaderContainer,
  sectionContainer,
  rowContainer,
  claimContainer,
  claimedDateStyle,
  marginRight,
  footer,
} from './style';

const Item = ({
  item: {
    status,
    friendInfo: {name, maskedPhoneNumber},
    reward,
  },
  claimRewardRequest,
  claimRewardData,
  handleRewardGotPress,
}) => {
  const theme = useTheme();
  const {value, claimedTime, id: rewardId} = reward || {};

  const handleClaimPress = async () => {
    try {
      if (rewardId) {
        console.log(rewardId);
        await claimRewardRequest({
          variables: {
            id: rewardId,
          },
        });
      }
      return;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={rewardContainer}>
      <AppAvator variant="initials" sizeVariant="small" name={name} />
      <View style={contactContainer}>
        <AppText variant="body1" style={nameStyle(theme)}>
          {name}
        </AppText>
        <AppText variant="caption" style={numberStyle(theme)}>
          {splitPhoneNumber(maskedPhoneNumber)}
        </AppText>
      </View>
      <View>
        {status === 'PENDING' && (
          <AppText variant="caption" style={statusStyle(theme)}>
            Pending
          </AppText>
        )}
        {status === 'PROCESSED' && !!claimedTime && (
          <View style={claimContainer}>
            <TransactionAmount
              amount={value}
              amountColor={theme.colors.textOnBackground.disabled}
              unitVariant="MRP"
              unitSizeVariant="small"
              unitColor={theme.colors.secondary.normal}
            />
            <AppText variant="caption" style={claimedDateStyle(theme)}>
              <FormattedMessage
                id="claimed_on"
                defaultMessage="Claimed on {date}"
                values={{
                  date: (
                    <FormattedDate
                      value={claimedTime}
                      year="numeric"
                      month="long"
                      day="2-digit"
                    />
                  ),
                }}
              />
            </AppText>
          </View>
        )}
        {status === 'PROCESSED' && !claimedTime && (
          <View style={rowContainer}>
            <TransactionAmount
              amount={value}
              amountColor={theme.colors.textOnBackground.disabled}
              unitVariant="MRP"
              unitSizeVariant="small"
              unitColor={theme.colors.secondary.normal}
              style={marginRight}
            />
            <AppButton
              onPress={handleClaimPress}
              variant="filled"
              sizeVariant="compact"
              colorVariant="secondary"
              text={<FormattedMessage id="button.claim" />}
            />
          </View>
        )}
      </View>

      <RewardGotPopup
        visible={!!claimRewardData}
        onOkPress={handleRewardGotPress}
        rewardName={<FormattedMessage id="reward_type_bonus_task" />}
        rewardAmount={value}
      />
    </View>
  );
};

const RewardsSection = () => {
  const theme = useTheme();

  const {data, refetch, loading} = useQueryWithAuth(GET_USER_REFERRAL_STATUS, {
    fetchPolicy: 'network-only',
  });

  const [
    claimRewardRequest,
    {data: claimRewardData},
    reset,
  ] = useMutationWithReset(CLAIM_REWARD_API, {}, {withAuth: true});

  const handleRewardGotPress = () => {
    reset();
    refetch();
  };

  const sectionData = {};
  sectionData.invitees =
    data?.userProfile?.referrals.length > 0
      ? data?.userProfile?.referrals
          .filter((referral) => referral.isReferrer)
          .map((referral) => referral)
      : [];
  sectionData.inviter =
    data?.userProfile?.referrals.length > 0
      ? data?.userProfile?.referrals
          .filter((referral) => !referral.isReferrer)
          .map((referral) => referral)
      : [];

  const DATA = Object.keys(sectionData)
    .filter((section) => sectionData[section].length > 0)
    .map((section) => ({
      section,
      data: sectionData[section],
    }));

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item) => item.name}
      renderItem={({item}) => (
        <Item
          item={item}
          claimRewardData={claimRewardData}
          claimRewardRequest={claimRewardRequest}
          handleRewardGotPress={handleRewardGotPress}
        />
      )}
      renderSectionHeader={({section: {section}}) => (
        <View style={sectionHeaderContainer(theme)}>
          <AppText variant="label" style={sectionHeader(theme)}>
            {section}
          </AppText>
        </View>
      )}
      renderSectionFooter={() => <View style={footer} />}
      style={sectionContainer}
      container
    />
  );
};

export default RewardsSection;
