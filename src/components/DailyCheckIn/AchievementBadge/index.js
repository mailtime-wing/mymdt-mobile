import React, {useEffect} from 'react';

import {BadgeImage} from './style';

const AchievementBadge = ({
  day,
  setDaysPresentInBadge,
  checkedInToday,
  isEnglish,
}) => {
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
  achievementDays.map((ad) => {
    const todayIsTargetDay = day === ad.targetDay;
    const todayIsAfterTargetDay = day > ad.targetDay;
    if ((todayIsTargetDay && checkedInToday) || todayIsAfterTargetDay) {
      badgeSourceArray.push(ad);
    }
  });

  // TODO: improve loading
  useEffect(() => {
    if (badgeSourceArray.length > 0) {
      const targetDayInTheLatestBadge =
        badgeSourceArray[badgeSourceArray.length - 1].targetDay;
      setDaysPresentInBadge(targetDayInTheLatestBadge);
    }
  }, [badgeSourceArray, setDaysPresentInBadge]);

  return badgeSourceArray.map((badge) => (
    <BadgeImage
      key={badge.targetDay}
      source={badge.imageSource}
      resizeMode="contain"
    />
  ));
};

export default AchievementBadge;
