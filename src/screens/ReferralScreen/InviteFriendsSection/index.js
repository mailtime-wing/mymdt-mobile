import React from 'react';
import {View, TextInput} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import Clipboard from '@react-native-community/clipboard';

import ThemeButton from '@/components/ThemeButton';
import ProgressBar from '@/components/ProgressBar';
import AppText from '@/components/AppText2';
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

const InviteFriendSection = ({referralCode}) => {
  const theme = useTheme();

  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
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
              value={referralCode}
              style={textInput(theme)}
              editable={false}
            />
          </View>
        </View>
        <ThemeButton medium onPress={copyToClipboard}>
          COPY
        </ThemeButton>
      </View>
    </>
  );
};

export default InviteFriendSection;
