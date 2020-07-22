import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';

import {
  Container,
  HorizontalScrollContainer,
  CardNumberText,
  CardText,
  Card,
  GotCheckInRewardText,
  CovertedContainer,
  ConvertedText,
  MarginTop,
} from './style';

import MRPCoin from '@/components/MRPCoin';
import MRPGiftBox from '@/components/MRPGiftBox';
import ThemeButton from '@/components/ThemeButton';
import PopupModalWithLinearGradient from '@/components/PopupModalWithLinearGradient';

const giftBoxStyle = {
  transform: [
    {
      scale: 0.75,
    },
  ],
};

const DailyCheckIn = ({
  dayListWithAmount,
  currentDay,
  canCheckIn,
  converted,
}) => {
  const [showCheckInReward, setShowCheckInReward] = useState(false);
  const coinColor = props => props.theme.colors.secondary.superDark;
  return (
    <Container>
      <HorizontalScrollContainer
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {dayListWithAmount.map((amount, index) => {
          const day = index + 1;
          const passedDay = day < currentDay;
          const today = day === currentDay;
          return (
            <Card key={index} passedDay={passedDay} today={today}>
              <CardNumberText passedDay={passedDay} today={today}>
                {day}
              </CardNumberText>
              <CardText passedDay={passedDay} today={today}>
                <FormattedMessage id="day" defaultMessage="Day" />
              </CardText>
              <MRPCoin
                amount={amount}
                size={18}
                fontSize={16}
                color={props =>
                  passedDay ? props.theme.colors.white.normal : coinColor
                }
              />
            </Card>
          );
        })}
      </HorizontalScrollContainer>
      <ThemeButton
        onPress={() => setShowCheckInReward(true)}
        disabled={!canCheckIn}
        medium
        width="auto">
        <FormattedMessage id="check_in" defaultMessage="Check in" />
      </ThemeButton>
      {showCheckInReward && (
        <PopupModalWithLinearGradient
          callback={() => setShowCheckInReward(false)}>
          <MRPGiftBox style={giftBoxStyle} />
          <GotCheckInRewardText color={coinColor}>
            You got a check-in reward!
          </GotCheckInRewardText>
          <MRPCoin amount={50} size={28} fontSize={24} color={coinColor} />
          {converted && (
            <CovertedContainer>
              <ConvertedText>Converted from</ConvertedText>
              <MRPCoin amount={50} size={16} fontSize={16} color={coinColor} />
            </CovertedContainer>
          )}
          <MarginTop />
        </PopupModalWithLinearGradient>
      )}
    </Container>
  );
};

export default DailyCheckIn;
