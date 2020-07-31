import React, {useContext, useState, useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import {AuthContext} from '@/context/auth';
import {useLazyQuery} from '@apollo/react-hooks';
import {TRANSACTIONS_QUERY} from '@/api/data';
import {REWARD, REDEEM, INTEREST, CHECK_IN} from '@/constants/transactionsType';
import { useTheme } from 'emotion-theming';

import {ScrollContainer} from './style';

import AccountBar from '@/components/AccountBar';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';
import TransactionBottomSheet from '@/components/TransactionBottomSheet';
import LoadingSpinner from '@/components/LoadingSpinner';

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

const filterList = [
  {label: 'ALL'},
  {label: 'REWARD', value: REWARD},
  {label: 'REDEEM', value: REDEEM},
  {label: 'INTEREST', value: INTEREST},
  {label: 'CHECK_IN', value: CHECK_IN},
  // 'All',
  // REWARD,
  // REDEEM,
  // INTEREST,
  // CHECK_IN,
  ['foo@gmail.com', 'bar@gmail.com'],
  ['Mastercard (•••• 1001)', 'ABC Bank (•••• 1234)', 'ABC Bank (•••• 4567)'],
];

const WalletScreen = ({navigation}) => {
  const theme = useTheme()
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const {authToken} = useContext(AuthContext);
  const [getTransactions, {data, loading}] = useLazyQuery(TRANSACTIONS_QUERY, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const cardList = [
    {
      type: MEASURABLE_REWARD_POINT,
      title: 'RewardPoint',
      coin: (
        <MRPCoin
          amount={
            data?.userProfile?.currencyAccounts?.find(
              ca => ca.currencyCode === MEASURABLE_REWARD_POINT,
            ).balance || 0
          }
          size={42}
          fontSize={42}
          color={theme.colors.background1}
          style={styleFlexEnd}
        />
      ),
      theme: {color: mrpTheme.color, borderColor: mrpTheme.borderColor},
      actionList: [
        {
          name: 'convert',
          id: 'converter',
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
          amount={
            data?.userProfile?.currencyAccounts?.find(
              ca => ca.currencyCode === MEASURABLE_DATA_TOKEN,
            ).balance || 0
          }
          size={42}
          fontSize={42}
          color={theme.colors.background1}
          style={styleFlexEnd}
        />
      ),
      aroundInUsd:
        data?.userProfile?.currencyAccounts?.find(
          ca => ca.currencyCode === MEASURABLE_DATA_TOKEN,
        ).balance || 0 * 0.78,
      theme: {color: mdtTheme.color, borderColor: mdtTheme.borderColor},
      actionList: [
        {name: 'convert', icon: <ConvertIcon fill={mdtTheme.color} />},
        {name: 'withdrawal', icon: <WithdrawalIcon fill={mdtTheme.color} />},
        {name: 'gift code', icon: <MdtGiftCodeIcon fill={mdtTheme.color} />},
      ],
    },
  ];

  const currentCard = cardList[activeCardIndex];
  const currentCardData = data?.userProfile?.currencyAccounts?.find(
    ca => ca.currencyCode === currentCard.type,
  );
  const cardTransactionsHistory = currentCardData?.transactions?.edges.map(
    transaction =>
      (transaction = {
        ...transaction,
        icon: <ConvertIcon fill={currentCard.theme.color} />,
      }),
  );

  const handleOnSnapToItem = cardIndex => {
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

  const onApplyPress = () => {
    let filter = filterList[activeFilterIndex].value;
    if (filter) {
      getTransactions({variables: {filter: {type: filter}}});
    } else {
      getTransactions();
    }

    setShowBottomSheet(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <LinearGradientBackground>
      <ScrollContainer>
        <AccountBar navigation={navigation} />
        <CardList cardList={cardList} onSnapToItem={handleOnSnapToItem} />
        <ActionButtons
          actionList={currentCard.actionList}
          color={currentCard.theme.color}
          navigation={navigation}
        />
        <TransactionsHistory
          transactionsHistoryList={cardTransactionsHistory}
          currentTheme={currentCard.theme}
          cardType={currentCard.type}
          currentFilter={
            <FormattedMessage id="filter" defaultMessage="FILTER" />
          }
          handleFilterPress={handleFilterPress}
          navigation={navigation}
        />
      </ScrollContainer>
      {showBottomSheet && (
        <TransactionBottomSheet
          title={<FormattedMessage id="filter_by" defaultMessage="Filter by" />}
          items={filterList}
          activeOptionIndex={activeFilterIndex}
          onLayoutPress={handleLayoutPress}
          onItemPress={handleItemPress}
          onApplyPress={onApplyPress}
        />
      )}
    </LinearGradientBackground>
  );
};

export default WalletScreen;
