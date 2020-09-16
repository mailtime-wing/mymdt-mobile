import React from 'react';
import {Image} from 'react-native';

import {image} from './style';

import membershipLevel from '@/enum/membershipLevel';

const levelCardList = [
  {
    level: membershipLevel.BASIC,
    cardSrc: require('@/assets/basic_membership_card.png'),
  },
  {
    level: membershipLevel.SILVER,
    cardSrc: require('@/assets/silver_membership_card.png'),
  },
  {
    level: membershipLevel.GOLD,
    cardSrc: require('@/assets/gold_membership_card.png'),
  },
  {
    level: membershipLevel.PLATINUM,
    cardSrc: require('@/assets/platinum_membership_card.png'),
  },
  {
    level: membershipLevel.DIAMOND,
    cardSrc: require('@/assets/diamond_membership_card.png'),
  },
  {
    level: membershipLevel.SPECIAL,
    cardSrc: require('@/assets/special_membership_card.png'),
  },
];

const MembershipCard = ({userLevel, style}) => {
  return (
    <Image
      source={
        levelCardList.find(levelCard => userLevel === levelCard.level)?.cardSrc
      }
      style={[image, style]}
    />
  );
};

export default MembershipCard;
