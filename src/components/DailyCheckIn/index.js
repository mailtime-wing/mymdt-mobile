import React from 'react';
import {FormattedMessage} from 'react-intl';

import {
  Container,
  HorizontalScrollContainer,
  CardNumberText,
  CardText,
  Card,
} from './style';

import MRPCoin from '@/components/MRPCoin';
import ThemeButton from '@/components/ThemeButton';

const DailyCheckIn = ({dayListWithAmount, currentDay}) => (
  <Container>
    <HorizontalScrollContainer
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {dayListWithAmount.map((amount, index) => {
        const day = index + 1;
        const passedDay = day < currentDay;
        const today = day === currentDay;
        return (
          <Card passedDay={passedDay} today={today}>
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
                passedDay
                  ? props.theme.colors.white.normal
                  : props.theme.colors.secondary.superDark
              }
            />
          </Card>
        );
      })}
    </HorizontalScrollContainer>
    <ThemeButton medium width="auto">
      <FormattedMessage id="check_in" defaultMessage="Check in" />
    </ThemeButton>
  </Container>
);

export default DailyCheckIn;
