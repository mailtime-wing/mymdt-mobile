import React, {useState, useContext} from 'react';
import {FormattedMessage} from 'react-intl';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {GET_CHECK_IN_STATUS_API, CHECK_IN_API} from '@/api/data';
import {AuthContext} from '@/context/auth';
import {IntlContext} from '@/context/Intl';

import {
  Container,
  HorizontalScrollContainer,
  GotCheckInRewardText,
  CovertedContainer,
  ConvertedText,
  MarginTop,
  MarginLeft,
} from './style';

import MRPCoin from '@/components/MRPCoin';
import MRPGiftBox from '@/components/MRPGiftBox';
import ThemeButton from '@/components/ThemeButton';
import PopupModalWithLinearGradient from '@/components/PopupModalWithLinearGradient';
import PopupModal from '@/components/PopupModal';
import DayList from './DayList';
import AchievementBadge from './AchievementBadge';

const giftBoxStyle = {
  transform: [
    {
      scale: 0.75,
    },
  ],
};

// TODO: do not control by props, preload user current currency
const DailyCheckIn = ({converted}) => {
  const [daysPresentInBadge, setDaysPresentInBadge] = useState(0);
  const {authToken} = useContext(AuthContext);
  const {localeEnum} = useContext(IntlContext);

  const {data, refetch} = useQuery(GET_CHECK_IN_STATUS_API, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  });

  const [checkIn, {data: checkInData, error: checkInError}] = useMutation(
    CHECK_IN_API,
  );

  const handleCheckInPress = async () => {
    try {
      await checkIn({
        context: {
          headers: {
            authorization: authToken ? `Bearer ${authToken}` : '',
          },
        },
      });
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
  const coinColor = props => props.theme.colors.secondary.superDark;

  return (
    <Container>
      <HorizontalScrollContainer
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <MarginLeft />
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
        <MarginLeft />
      </HorizontalScrollContainer>
      <ThemeButton
        medium
        width="auto"
        disabled={checkedInToday}
        onPress={handleCheckInPress}>
        {checkedInToday ? (
          <FormattedMessage id="checked_in" defaultMessage="Checked in" />
        ) : (
          <FormattedMessage id="check_in" defaultMessage="Check in" />
        )}
      </ThemeButton>
      {checkInData && (
        <PopupModalWithLinearGradient callback={refetch}>
          <MRPGiftBox style={giftBoxStyle} />
          <GotCheckInRewardText color={coinColor}>
            You got a check-in reward!
          </GotCheckInRewardText>
          <MRPCoin
            amount={todayRewardAmount}
            size={28}
            fontSize={24}
            color={coinColor}
          />
          {converted && (
            <CovertedContainer>
              <ConvertedText>Converted from</ConvertedText>
              <MRPCoin
                amount={todayRewardAmount}
                size={16}
                fontSize={16}
                color={coinColor}
              />
            </CovertedContainer>
          )}
          <MarginTop />
        </PopupModalWithLinearGradient>
      )}
      {checkInError && (
        <PopupModal
          title="Something went wrong!"
          detail="Please try again later"
        />
      )}
    </Container>
  );
};

export default DailyCheckIn;
