import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';

import {ScrollContainer} from './style';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';
import BottomSheet from '@/components/BottomSheet';

import CardList from './CardList';
import ActionButtons from './ActionButtons';
import TransactionsHistory from './TransactionsHistory';

import {
  MEASURABLE_REWARD_POINT,
  MEASURABLE_DATA_TOKEN,
} from '@/constants/currency';

import ConvertIcon from '@/assets/convert.svg';
import RedeemGiftIcon from '@/assets/redeem_gift.svg';
import WithdrawalIcon from '@/assets/withdrawal.svg';
import MdtGiftCodeIcon from '@/assets/mdt_gift_code.svg';

const styleFlexEnd = {
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  marginBottom: 16,
};

const mrpTheme = {
  color: '#21CEDB',
  borderColor: 'rgba(33, 206, 219, 0.2)',
};

const mdtTheme = {
  color: '#0363EF',
  borderColor: 'rgba(3, 99, 239, 0.2)',
};

const cardList = [
  {
    type: MEASURABLE_REWARD_POINT,
    title: 'RewardPoint',
    coin: (
      <MRPCoin
        amount={16543}
        size={42}
        fontSize={42}
        color={props => props.theme.colors.background1}
        style={styleFlexEnd}
      />
    ),
    theme: {color: mrpTheme.color, borderColor: mrpTheme.borderColor},
    actionList: [
      {
        name: 'convert',
        id: 'converter',
        from: MEASURABLE_REWARD_POINT,
        to: MEASURABLE_DATA_TOKEN,
        icon: <ConvertIcon fill={mrpTheme.color} />,
      },
      {name: 'redeem gift', icon: <RedeemGiftIcon fill={mrpTheme.color} />},
    ],
  },
  {
    type: MEASURABLE_DATA_TOKEN,
    title: 'Measurable Data Token',
    coin: (
      <MDTCoin
        amount={54321}
        size={42}
        fontSize={42}
        color={props => props.theme.colors.background1}
        style={styleFlexEnd}
      />
    ),
    aroundInUsd: 123,
    theme: {color: mdtTheme.color, borderColor: mdtTheme.borderColor},
    actionList: [
      {
        name: 'convert',
        id: 'converter',
        from: MEASURABLE_DATA_TOKEN,
        to: MEASURABLE_REWARD_POINT,
        icon: <ConvertIcon fill={mdtTheme.color} />,
      },
      {
        name: 'withdrawal',
        id: 'withdrawal',
        icon: <WithdrawalIcon fill={mdtTheme.color} />,
      },
      {name: 'gift code', icon: <MdtGiftCodeIcon fill={mdtTheme.color} />},
    ],
  },
];

const filterList = [
  'All',
  'abc@email.com',
  'foobar@gmail.commmmmmmm',
  ['foo@gmail.com', 'bar@gmail.com'],
  ['Mastercard (•••• 1001)', 'ABC Bank (•••• 1234)', 'ABC Bank (•••• 4567)'],
];

const WalletScreen = ({navigation}) => {
  const [currentTheme, setCurrentTheme] = useState(cardList[0].theme);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);

  const transactionsHistory = [
    // TODO: integrate transactions data from api
    {
      icon: <ConvertIcon fill={currentTheme.color} />,
      name: 'RewardPoint ⟶ MDT 1',
      date: new Date(),
      amount: 1999,
    },
    {
      icon: <ConvertIcon fill={currentTheme.color} />,
      name: 'RewardPoint ⟶ MDT 2',
      date: new Date(),
      amount: 1529,
    },
    {
      icon: <ConvertIcon fill={currentTheme.color} />,
      name: 'RewardPoint ⟶ MDT 3',
      date: new Date(),
      amount: 55519,
    },
    {
      icon: <ConvertIcon fill={currentTheme.color} />,
      name: 'RewardPoint ⟶ MDT 4',
      date: new Date(),
      amount: 1129,
    },
    {
      icon: <ConvertIcon fill={currentTheme.color} />,
      name: 'RewardPoint ⟶ MDT 5',
      date: new Date(),
      amount: 6,
    },
  ];

  const handleOnSnapToItem = cardIndex => {
    setCurrentTheme(cardList[cardIndex].theme);
    setActiveCardIndex(cardIndex);
  };

  const handleFilterPress = () => {
    setShowBottomSheet(true);
  };

  const handleLayoutPress = () => {
    setShowBottomSheet(false);
  };

  const handleItemPress = index => {
    setActiveFilterIndex(index);
  };

  return (
    <LinearGradientBackground>
      <ScrollContainer>
        <AccountBar navigation={navigation} />
        <CardList cardList={cardList} onSnapToItem={handleOnSnapToItem} />
        <ActionButtons
          actionList={cardList[activeCardIndex].actionList}
          color={currentTheme.color}
          navigation={navigation}
        />
        <TransactionsHistory
          transactionsHistoryList={transactionsHistory}
          currentTheme={currentTheme}
          cardType={cardList[activeCardIndex].type}
          currentFilter={
            <FormattedMessage id="filter" defaultMessage="FILTER" />
          }
          handleFilterPress={handleFilterPress}
          navigation={navigation}
        />
      </ScrollContainer>
      {showBottomSheet && (
        <BottomSheet
          title={<FormattedMessage id="filter_by" defaultMessage="Filter by" />}
          items={filterList}
          activeOptionIndex={activeFilterIndex}
          onLayoutPress={handleLayoutPress}
          onItemPress={handleItemPress}
        />
      )}
    </LinearGradientBackground>
  );
};

export default WalletScreen;
