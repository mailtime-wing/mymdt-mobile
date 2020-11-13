import React from 'react';
import {View} from 'react-native';
import {levelChip, border} from './style';
import membershipLevel from '@/enum/membershipLevel';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';

const MembershipLevelChip = ({userLevel, style}) => {
  const theme = useTheme();
  const levels = [
    {
      level: membershipLevel.NEWBIE,
      backgroundColor: theme.colors.membership.newbie.badge.background,
      textColor: theme.colors.membership.newbie.badge.text,
      borderColor: theme.colors.membership.newbie.badge.border,
    },
    {
      level: membershipLevel.STARTER,
      backgroundColor: theme.colors.membership.starter.badge.background,
      textColor: theme.colors.membership.starter.badge.text,
    },
    {
      level: membershipLevel.EXTRA,
      backgroundColor: theme.colors.membership.extra.badge.background,
      textColor: theme.colors.membership.extra.badge.text,
    },
    {
      level: membershipLevel.ELITE,
      backgroundColor: theme.colors.membership.elite.badge.background,
      textColor: theme.colors.membership.elite.badge.text,
    },
    {
      level: membershipLevel.INFINITE,
      backgroundColor: theme.colors.membership.infinite.badge.background,
      textColor: theme.colors.membership.infinite.badge.text,
    },
    {
      level: membershipLevel.INFINITE_PRIVILEGE,
      backgroundColor:
        theme.colors.membership.infinite_privilege.badge.background,
      textColor: theme.colors.membership.infinite_privilege.badge.text,
      borderColor: theme.colors.membership.infinite_privilege.border,
    },
  ];

  const currentLevel = levels.find((level) => level.level === userLevel);
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
      <AppText variant="label" style={{color: textColor}}>
        <FormattedMessage id={`membership_level_${currentLevel.level}`} />
      </AppText>
    </View>
  );
};

export default MembershipLevelChip;
