import React from 'react';
import {Image} from 'react-native';

import {image} from './style';

import membershipLevel from '@/enum/membershipLevel';

const levelCardList = [
  {
    level: membershipLevel.NEWBIE,
    cardSrc: require('@/assets/starter_card.png'),
  },
  {
    level: membershipLevel.STARTER,
    cardSrc: require('@/assets/starter_card.png'),
  },
  {
    level: membershipLevel.EXTRA,
    cardSrc: require('@/assets/extra_card.png'),
  },
  {
    level: membershipLevel.ELITE,
    cardSrc: require('@/assets/elite_card.png'),
  },
  {
    level: membershipLevel.INFINITE,
    cardSrc: require('@/assets/infinite_card.png'),
  },
  {
    level: membershipLevel.INFINITE_PRIVILEGE,
    cardSrc: require('@/assets/infinite_privilege_card.png'),
  },
];

const MembershipCard = ({userLevel, style}) => {
  return (
    <Image
      source={
        levelCardList.find((levelCard) => userLevel === levelCard.level)
          ?.cardSrc
      }
      style={[image, style]}
    />
  );
};

export default MembershipCard;
