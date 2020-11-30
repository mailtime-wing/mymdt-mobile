import React, {useEffect, useContext, useRef} from 'react';
import {View, TextInput, Share, Platform} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppButton from '@/components/AppButton';
import ProgressBar from '@/components/ProgressBar';
import AppText from '@/components/AppText2';
import LoadingSpinner from '@/components/LoadingSpinner';
import {BranchContext} from '@/context/branch';
import {PreloadDataContext} from '@/context/preloadData';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_TASKS_AND_REFERRALS} from '@/api/data';
import ShareIcon from '@/assets/icon_share.svg';
import {
  progressBarContainer,
  referralContainer,
  inputContainer,
  detailStyle,
  sectionHeaderStyle,
  progressTitleStyle,
  progressLabelStyle,
  textInput,
  textInputContainer,
  container,
} from './style';

const InviteFriendSection = () => {
  const theme = useTheme();
  const intl = useIntl();
  const referralUrlRef = useRef('');
  const {branchUniversalObject, referralCode} = useContext(BranchContext);
  const {appConfig} = useContext(PreloadDataContext);
  const {data, isLoading, error} = useQueryWithAuth(
    GET_USER_TASKS_AND_REFERRALS,
  );
  const referralTask = data?.userProfile?.tasks.find(
    (task) => task.id === appConfig.referralTaskID,
  ) || {
    maxCompletion: 0,
    rewardValue: 0,
  };
  const numberOfReferralRecords =
    data?.userProfile?.referrals?.filter((referral) => referral.isReferrer)
      .length || 0;

  useEffect(() => {
    const generate = async () => {
      try {
        let {url} = await branchUniversalObject.generateShortUrl({
          feature: 'referral',
          channel: 'RewardMe',
        });
        url = `${url}?r=${referralCode}`;
        referralUrlRef.current = url;
      } catch {
        // TODO
      }
    };

    if (branchUniversalObject) {
      generate();
    }
  }, [branchUniversalObject, referralCode]);

  const handleSharePress = async () => {
    if (branchUniversalObject) {
      Share.share({
        message:
          Platform.OS === 'android'
            ? `${intl.formatMessage({
                id: 'joinRewardMeWithThisLink',
              })} ${referralUrlRef.current}`
            : intl.formatMessage({
                id: 'joinRewardMeWithThisLink',
              }),
        title: intl.formatMessage({
          id: 'joinRewardMe',
        }),
        url: referralUrlRef.current,
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    // TODO: handle error
  }

  return (
    <View style={container}>
      <AppText variant="body1" style={detailStyle(theme)}>
        <FormattedMessage
          id="invite_friends_to_reward_me"
          defaultMessage="Invite friends to RewardMe. Rewards will be given if they can finish the account setup."
        />
      </AppText>
      <ProgressBar
        title={
          <AppText variant="body2" style={progressTitleStyle(theme)}>
            <FormattedMessage id="referral" defaultMessage="Referral" />
          </AppText>
        }
        progressLabel={
          <AppText variant="caption" style={progressLabelStyle(theme)}>
            {`${numberOfReferralRecords}/${referralTask.maxCompletion}`}
          </AppText>
        }
        progress={
          referralTask.maxCompletion === 0
            ? 0
            : numberOfReferralRecords / referralTask.maxCompletion
        }
        style={progressBarContainer}
      />
      <AppText variant="heading5" style={sectionHeaderStyle(theme)}>
        <FormattedMessage
          id="share_your_referral_code"
          defaultMessage="Share your referral code"
        />
      </AppText>
      <AppText variant="body1" style={detailStyle(theme)}>
        <FormattedMessage
          id="once_your_friend_entered_the_code"
          values={{amount: referralTask.rewardValue}}
        />
      </AppText>
      <View style={referralContainer}>
        <View style={inputContainer}>
          <View style={textInputContainer(theme)}>
            <TextInput
              value={referralCode}
              style={textInput(theme)}
              editable={false}
            />
          </View>
        </View>
        <AppButton
          onPress={handleSharePress}
          text="SHARE"
          variant="filled"
          sizeVariant="normal"
          colorVariant="secondary"
          svgIcon={ShareIcon}
          disabled={!branchUniversalObject}
        />
      </View>
    </View>
  );
};

export default InviteFriendSection;
