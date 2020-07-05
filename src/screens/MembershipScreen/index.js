import React from 'react';
import {View} from 'react-native';
import ModalContainer from '@/components/ModalContainer';
import {FormattedMessage} from 'react-intl';

import Button from '@/components/Button';

import ProgressBar from './ProgressBar';
import Card, {BasicCard} from './Card';

import {
  Header,
  CardContainer,
  CardImage,
  Offer,
  Birthday,
  ExpirationDateContainer,
  ExpirationDate,
  Date,
  NextLevel,
  Level,
  MembershipProgram,
} from './style';

const CardSection = () => {
  const cards = [
    {
      level: 'Diamond',
      percentage: '5',
      brands: 'Reward from ALL Brands',
      friends: '100',
      amount: '50,000',
    },
    {
      level: 'Platinum',
      percentage: '3',
      brands: 'Reward from 4 Brands',
      friends: '50',
      amount: '25,000',
    },
    {
      level: 'Gold',
      percentage: '2',
      brands: 'Reward from 3 Brands',
      friends: '20',
      amount: '1,000',
    },
    {
      level: 'Silver',
      percentage: '1',
      friends: '10',
      amount: '100',
    },
  ];
  return (
    <View>
      {cards.map(card => (
        <Card
          level={card.level}
          cashBackPercentage={card.percentage}
          brands={card.brands}
          friends={card.friends}
          amount={card.amount}
        />
      ))}
      <BasicCard />
    </View>
  );
};

const MembershipScreen = () => {
  return (
    <ModalContainer title={<FormattedMessage id="membership" />}>
      <Header>Current LEVEL</Header>
      <CardContainer>
        <CardImage source={require('@/assets/gold_card.png')} />
      </CardContainer>
      <Header>Offers</Header>
      <Offer>3 Favourite Brands Additional 2% CashBack</Offer>
      <Button small width="80%">
        Favorite Perference
      </Button>
      <Birthday>Birthday Gift</Birthday>
      <ExpirationDateContainer>
        <ExpirationDate>Expiration date</ExpirationDate>
        <Date>21/12/2021</Date>
      </ExpirationDateContainer>
      <NextLevel>Next LEVEL</NextLevel>
      <Level>PLATINUM</Level>
      <ProgressBar
        title="INVITE Friends"
        progressLabel="20/50"
        progress={20 / 50}
      />
      <Button small width="50%">
        Invite Friends
      </Button>
      <ProgressBar
        title="expense amount"
        progressLabel="16,543/20,000"
        progress={16543 / 20000}
      />
      <MembershipProgram>Membership program</MembershipProgram>
      <CardSection />
    </ModalContainer>
  );
};

export default MembershipScreen;
