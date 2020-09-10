import React, {useState, useContext} from 'react';
import {View, ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithReset from '@/hooks/useMutationWithReset';
import {GET_CHECK_IN_STATUS_API, CHECK_IN_API} from '@/api/data';
import {IntlContext} from '@/context/Intl';

import {
  convertedText,
  gotRewardText,
  margin,
  dayList,
  container,
  checkInButton,
  convertedContainer,
} from './style';

import MRPCoin from '@/components/MRPCoin';
import MRPGiftBox from '@/components/MRPGiftBox';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import PopupModalWithLinearGradient from '@/components/PopupModalWithLinearGradient';
import PopupModal from '@/components/PopupModal';
import DayList from './DayList';
import AchievementBadge from './AchievementBadge';
import {useTheme} from 'emotion-theming';

const giftBoxStyle = {
  transform: [
    {
      scale: 0.75,
    },
  ],
};

// TODO: do not control by props, preload user current currency
const DailyCheckIn = ({converted}) => {
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
            <FormattedMessage id="checked_in" defaultMessage="Checked in" />
          ) : (
            <FormattedMessage id="check_in" defaultMessage="Check in" />
          )
        }
        disabled={checkedInToday}
        variant="filled"
        sizeVariant="normal"
        colorVariant="secondary"
        style={checkInButton}
      />
      <PopupModalWithLinearGradient
        visible={!!checkInData}
        callback={handleRewardGotPress}>
        <MRPGiftBox style={giftBoxStyle} />
        <AppText variant="heading4" style={gotRewardText(theme, coinColor)}>
          You got a check-in reward!
        </AppText>
        <MRPCoin
          amount={todayRewardAmount}
          size={28}
          fontSize={24}
          color={coinColor}
        />
        {converted && (
          <View style={convertedContainer}>
            <AppText variant="body2" style={convertedText(theme)}>
              Converted from
            </AppText>
            <MRPCoin
              amount={todayRewardAmount}
              size={16}
              fontSize={16}
              color={coinColor}
            />
          </View>
        )}
      </PopupModalWithLinearGradient>
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
