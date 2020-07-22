import React from 'react';

import {BadgeImage} from './style';

const AchievementBadge = ({day, setDaysPresentInBadge, isEnglish}) => {
  const achievementDays = [
    {
      targetDay: 50,
      imageSource: isEnglish
        ? require('@/assets/checkin_50days_english.png')
        : require('@/assets/checkin_50days_chinese.png'),
    },
    {
      targetDay: 100,
      imageSource: isEnglish
        ? require('@/assets/checkin_100days_english.png')
        : require('@/assets/checkin_100days_chinese.png'),
    },
    {
      targetDay: 150,
      imageSource: isEnglish
        ? require('@/assets/checkin_150days_english.png')
        : require('@/assets/checkin_150days_chinese.png'),
    },
    {
      targetDay: 1000,
      imageSource: isEnglish
        ? require('@/assets/checkin_1000days_english.png')
        : require('@/assets/checkin_1000days_chinese.png'),
    },
  ];
  let badgeSourceArray = [];
  achievementDays.map(ad => {
    if (day >= ad.targetDay) {
      badgeSourceArray.push(ad);
    }
  });

  if (badgeSourceArray.length <= 0) {
    return null;
  } else {
    const targetDayInTheLatestBadge =
      badgeSourceArray[badgeSourceArray.length - 1].targetDay;
    setDaysPresentInBadge(targetDayInTheLatestBadge);
  }

  return badgeSourceArray.map(badge => (
    <BadgeImage source={badge.imageSource} />
  ));
};

export default AchievementBadge;
