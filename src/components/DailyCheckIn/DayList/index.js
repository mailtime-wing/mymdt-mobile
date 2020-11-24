import React from 'react';
import {FormattedMessage} from 'react-intl';

import {REWARD_DOLLAR} from '@/constants/currency';

import {
  DayTextEnglish,
  DayNumberTextEnglish,
  DayNumberTextChinese,
  DayTextChinese,
  Card,
} from './style';

import MRPCoin from '@/components/MRPCoin';
import MDTCoin from '@/components/MDTCoin';

const DayList = ({
  todayAndAfterRewards,
  today,
  checkedInToday,
  daysPresentInBadge,
  cashbackCurrencyCode,
  isEnglish,
  coinColor,
}) => {
  return (
    // TODO: special handle dark mode style for daily check in
    <>
      {todayAndAfterRewards &&
        todayAndAfterRewards.map((amount, index) => {
          const day = index + 1 + daysPresentInBadge;
          const isToday = day === today;
          const isTodayCheckedIn = isToday && checkedInToday;
          const passedDay = isTodayCheckedIn ? day <= today : day < today;

          return (
            <Card key={index} passedDay={passedDay} isToday={isToday}>
              {isEnglish ? (
                <>
                  <DayTextEnglish passedDay={passedDay} isToday={isToday}>
                    <FormattedMessage id="day" defaultMessage="Day" />
                  </DayTextEnglish>
                  <DayNumberTextEnglish passedDay={passedDay} isToday={isToday}>
                    {day}
                  </DayNumberTextEnglish>
                </>
              ) : (
                <>
                  <DayNumberTextChinese passedDay={passedDay} isToday={isToday}>
                    {day}
                  </DayNumberTextChinese>
                  <DayTextChinese passedDay={passedDay} isToday={isToday}>
                    <FormattedMessage id="day" defaultMessage="Day" />
                  </DayTextChinese>
                </>
              )}
              {cashbackCurrencyCode === REWARD_DOLLAR ? (
                <MRPCoin
                  amount={amount}
                  size={18}
                  fontSize={16}
                  color={(props) =>
                    passedDay ? props.theme.colors.background1 : coinColor
                  }
                />
              ) : (
                <MDTCoin
                  amount={amount}
                  size={18}
                  fontSize={16}
                  color={(props) =>
                    passedDay ? props.theme.colors.background1 : coinColor
                  }
                />
              )}
            </Card>
          );
        })}
    </>
  );
};

export default DayList;
