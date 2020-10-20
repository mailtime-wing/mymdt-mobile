import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {
  progressTitleStyle,
  progressLabelStyle,
  progressContainer,
  container,
  sectionTitle,
  rowContainer,
  button,
} from './style';
import AppText from '@/components/AppText2';
import ProgressBar from '@/components/ProgressBar';
import AppButton from '@/components/AppButton';

const UpgradeSection = ({userNextLevel, style}) => {
  const theme = useTheme();
  const canUpgrade = false; // from api later
  // TODO: handle update ui when have api

  return (
    <View
      style={[
        css`
          ${theme.colors.elevatedBackground1}
        `,
        container,
        style,
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
      <View style={rowContainer}>
        <ProgressBar
          title={
            <AppText variant="body2" style={progressTitleStyle(theme)}>
              <FormattedMessage id="referral" />
            </AppText>
          }
          progressLabel={
            <AppText variant="caption" style={progressLabelStyle(theme)}>
              0/1
            </AppText>
          }
          progress={0 / 1}
          style={progressContainer}
        />
        <AppButton
          variant="filled"
          sizeVariant="compact"
          colorVariant="secondary"
          text="bind"
          style={button}
        />
      </View>
      {canUpgrade && (
        <AppButton
          variant="filled"
          sizeVariant="normal"
          colorVariant="secondary"
          text={<FormattedMessage id="upgrade_now" />}
        />
      )}
    </View>
  );
};

export default UpgradeSection;
