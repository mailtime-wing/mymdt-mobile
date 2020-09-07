import React from 'react';
import {View} from 'react-native';
import {levelChip, levelText, border} from './style';
import membershipLevel from '@/enum/membershipLevel';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';

const MembershipLevelChip = ({userLevel, style}) => {
  const theme = useTheme();
  const levels = [
    {
      level: membershipLevel.BASIC,
      backgroundColor: theme.colors.membership.basic.background,
      textColor: theme.colors.membership.basic.text,
      borderColor: theme.colors.membership.basic.border,
    },
    {
      level: membershipLevel.SILVER,
      backgroundColor: theme.colors.membership.silver.background,
      textColor: theme.colors.membership.silver.text,
    },
    {
      level: membershipLevel.GOLD,
      backgroundColor: theme.colors.membership.gold.background,
      textColor: theme.colors.membership.gold.text,
    },
    {
      level: membershipLevel.PLATINUM,
      backgroundColor: theme.colors.membership.platinum.background,
      textColor: theme.colors.membership.platinum.text,
    },
    {
      level: membershipLevel.DIAMOND,
      backgroundColor: theme.colors.membership.diamond.background,
      textColor: theme.colors.membership.diamond.text,
    },
    {
      level: membershipLevel.SPECIAL,
      backgroundColor: theme.colors.membership.special.background,
      textColor: theme.colors.membership.special.text,
    },
  ];

  const currentLevel = levels.find(level => level.level === userLevel);
  const backgroundColor = currentLevel.backgroundColor;
  const textColor = currentLevel.textColor;
  const borderColor = currentLevel.borderColor;

  return (
    <View
      style={[
        levelChip(backgroundColor),
        !!borderColor && border(borderColor),
        style,
      ]}>
      <AppText variant="label" style={levelText(textColor)}>
        <FormattedMessage id={`membership_level_${currentLevel.level}`} />
      </AppText>
    </View>
  );
};

export default MembershipLevelChip;
