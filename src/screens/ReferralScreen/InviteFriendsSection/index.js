import React, {useState, useEffect, useContext} from 'react';
import {View, TextInput} from 'react-native';
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
} from './style';

const InviteFriendSection = () => {
  const theme = useTheme();
  const intl = useIntl();
  const [referralUrl, setReferralUrl] = useState('');
  const {branchUniversalObject} = useContext(BranchContext);

  useEffect(() => {
    const generate = async () => {
      try {
        const {url} = await branchUniversalObject.generateShortUrl({
          feature: 'referral',
          channel: 'RewardMe',
        });
        setReferralUrl(url);
      } catch {
        // TODO
      }
    };

    if (branchUniversalObject) {
      generate();
    }
  }, [branchUniversalObject]);

  const handleSharePress = async () => {
    if (branchUniversalObject) {
      let shareOptions = {
        messageHeader: intl.formatMessage({
          id: 'joinRewardMe',
        }),
        messageBody: intl.formatMessage({
          id: 'joinRewardMeWithThisLink',
        }),
      };
      let linkProperties = {
        feature: 'referral',
        channel: 'RewardMe',
      };
      await branchUniversalObject.showShareSheet(shareOptions, linkProperties);
    }
  };

  return (
    <>
      <AppText variant="body1" style={detailStyle(theme)}>
        Invite friends to RewardMe. Rewards will be given if they can finish the
        account setup.
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
        style={progressBarContainer}
      />
      <AppText variant="heading5" style={sectionHeaderStyle(theme)}>
        Share your referral code
      </AppText>
      <AppText variant="body1" style={detailStyle(theme)}>
        Once your friend entered the code and completed the account setup, you
        and your friend will get 500.
      </AppText>
      <View style={referralContainer}>
        <View style={inputContainer}>
          <View style={textInputContainer(theme)}>
            <TextInput
              value={referralUrl}
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
        />
      </View>
    </>
  );
};

export default InviteFriendSection;
