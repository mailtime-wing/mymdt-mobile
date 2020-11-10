import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {container, sectionTitle} from './style';
import AppText from '@/components/AppText2';
import Requirement from '@/components/Requirement';
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
      <Requirement
        task="Bind 1 Email or 1 card"
        target={1}
        progress={0}
        action={() => console.log('pressed')}
        actionText="Bind"
      />
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
