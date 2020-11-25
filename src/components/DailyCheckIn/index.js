import React, {useState, useContext} from 'react';
import {View, ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithReset from '@/hooks/useMutationWithReset';
import {GET_CHECK_IN_STATUS_API, CHECK_IN_API} from '@/api/data';
import {IntlContext} from '@/context/Intl';
import {ME} from '@/constants/currency';

import {margin, dayList, container, checkInButton} from './style';

import AppButton from '@/components/AppButton';
import RewardGotPopup from '@/components/RewardGotPopup';
import PopupModal from '@/components/PopupModal';
import DayList from './DayList';
import AchievementBadge from './AchievementBadge';
import {useTheme} from 'emotion-theming';

const DailyCheckIn = () => {
  const theme = useTheme();
  const [daysPresentInBadge, setDaysPresentInBadge] = useState(0);
  const {localeEnum} = useContext(IntlContext);

  const {data, refetch} = useQueryWithAuth(GET_CHECK_IN_STATUS_API);

  const [
    checkIn,
    {data: checkInData, error: checkInError},
    reset,
  ] = useMutationWithReset(CHECK_IN_API, {}, {withAuth: true});

  const handleCheckInPress = async () => {
    try {
      await checkIn();
    } catch (e) {
      console.error(e);
    }
  };

  const isEnglish = localeEnum === 'EN_US';
  const today = data?.userProfile?.checkInStatus?.today;
  const checkedInToday = data?.userProfile?.checkInStatus?.hasCheckedInToday;
  const todayAndAfterRewards = data?.userProfile?.checkInStatus?.rewards;
  const todayRewardAmount =
    (todayAndAfterRewards && todayAndAfterRewards[today - 1]) || 0;
  const cashbackCurrencyCode = data?.userProfile?.cashbackCurrencyCode;
  const convert = cashbackCurrencyCode === ME;
  const coinColor = theme.colors.textOfMrp;

  const handleRewardGotPress = () => {
    reset();
    refetch();
  };

  return (
    <View style={container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={dayList}>
        <View style={margin} />
        <AchievementBadge
          day={today}
          setDaysPresentInBadge={setDaysPresentInBadge}
          isEnglish={isEnglish}
        />
        <DayList
          daysPresentInBadge={daysPresentInBadge}
          today={today}
          checkedInToday={checkedInToday}
          todayAndAfterRewards={todayAndAfterRewards}
          cashbackCurrencyCode={cashbackCurrencyCode}
          isEnglish={isEnglish}
          coinColor={coinColor}
        />
        <View style={margin} />
      </ScrollView>
      <AppButton
        onPress={handleCheckInPress}
        text={
          checkedInToday ? (
            <FormattedMessage
              id="button.checked_in"
              defaultMessage="Checked in"
            />
          ) : (
            <FormattedMessage id="button.check_in" defaultMessage="Check in" />
          )
        }
        disabled={checkedInToday}
        variant="filled"
        sizeVariant="normal"
        colorVariant="secondary"
        style={checkInButton}
      />
      <RewardGotPopup
        visible={!!checkInData}
        onOkPress={handleRewardGotPress}
        rewardName={<FormattedMessage id="reward_type_check_in" />}
        rewardAmount={todayRewardAmount}
        convert={convert}
      />
      <PopupModal
        visible={!!checkInError}
        title="Something went wrong!"
        detail="Please try again later"
        callback={reset}
      />
    </View>
  );
};

export default DailyCheckIn;
