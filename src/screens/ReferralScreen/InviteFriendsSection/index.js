import React, {useEffect, useContext, useRef} from 'react';
import {View, TextInput, Share, Platform} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppButton from '@/components/AppButton';
import ProgressBar from '@/components/ProgressBar';
import AppText from '@/components/AppText2';
import {BranchContext} from '@/context/branch';
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
            20/50
          </AppText>
        }
        progress={20 / 50}
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
          defaultMessage="Once your friend entered the code and completed the account setup, you and your friend will get 500."
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
