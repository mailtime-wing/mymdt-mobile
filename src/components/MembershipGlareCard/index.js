import React from 'react';
import {Image} from 'react-native';

import membershipLevel from '@/enum/membershipLevel';

const levelCardList = [
  {
    level: membershipLevel.NEWBIE,
    card: require('@/assets/newbie_card_glare.png'),
  },
  {
    level: membershipLevel.STARTER,
    card: require('@/assets/starter_card_glare.png'),
  },
  {
    level: membershipLevel.EXTRA,
    card: require('@/assets/extra_card_glare.png'),
  },
  {
    level: membershipLevel.ELITE,
    card: require('@/assets/elite_card_glare.png'),
  },
  {
    level: membershipLevel.INFINITE,
    card: require('@/assets/infinite_card_glare.png'),
  },
  {
    level: membershipLevel.INFINITE_PRIVILEGE,
    card: require('@/assets/infinite_privilege_card_glare.png'),
  },
];

const MembershipGlareCard = ({userLevel, style}) => {
  return (
    <Image
      source={
        levelCardList.find((levelCard) => userLevel === levelCard.level)?.card
      }
      style={style}
    />
  );
};

export default MembershipGlareCard;
