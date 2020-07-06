import React from 'react';
import {LevelChip, LevelText} from './style';
import membershipLevel from '@/enum/membershipLevel';
import {FormattedMessage} from 'react-intl';

const MembershipLevelChip = ({userLevel, style}) => {
  const levels = [
    {
      level: membershipLevel.BASIC,
      backgroundColor: props => props.theme.colors.membership.basic.background,
      textColor: props => props.theme.colors.membership.basic.text,
    },
    {
      level: membershipLevel.SILVER,
      backgroundColor: props => props.theme.colors.membership.silver.background,
      textColor: props => props.theme.colors.membership.silver.text,
    },
    {
      level: membershipLevel.GOLD,
      backgroundColor: props => props.theme.colors.membership.gold.background,
      textColor: props => props.theme.colors.membership.gold.text,
    },
    {
      level: membershipLevel.PLATINUM,
      backgroundColor: props =>
        props.theme.colors.membership.platinum.background,
      textColor: props => props.theme.colors.membership.platinum.text,
    },
    {
      level: membershipLevel.DIAMOND,
      backgroundColor: props =>
        props.theme.colors.membership.diamond.background,
      textColor: props => props.theme.colors.membership.diamond.text,
    },
    {
      level: membershipLevel.SPECIAL,
      backgroundColor: props =>
        props.theme.colors.membership.special.background,
      textColor: props => props.theme.colors.membership.special.text,
    },
  ];

  const currentLevel = levels.find(level => level.level === userLevel);

  return (
    <LevelChip style={style} background={currentLevel.backgroundColor}>
      <LevelText color={currentLevel.textColor}>
        <FormattedMessage id={`membership_level_${currentLevel.level}`} />
      </LevelText>
    </LevelChip>
  );
};

export default MembershipLevelChip;
