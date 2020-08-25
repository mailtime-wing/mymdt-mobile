import React from 'react';
import {FlatList} from 'react-native';

import {Container} from './style';

import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';
import TransactionItem from './TransactionItem';

import {MEASURABLE_REWARD_POINT} from '@/constants/currency';

const flexEnd = {justifyContent: 'flex-end'};

const TransactionList = ({transactionsHistoryList, cardType}) => {
  const renderItem = ({item}) => (
    <TransactionItem
      icon={item.icon}
      name={item.name}
      date={item.date}
      coin={
        cardType === MEASURABLE_REWARD_POINT ? (
          <MRPCoin
            amount={item.amount}
            size={16}
            fontSize={16}
            color={props => props.theme.colors.textOfMrp}
            style={flexEnd}
          />
        ) : (
          <MDTCoin
            amount={item.amount}
            size={16}
            fontSize={16}
            color={props => props.theme.colors.primary.dark}
            style={flexEnd}
          />
        )
      }
    />
  );

  return (
    <Container>
      <FlatList
        data={transactionsHistoryList}
        renderItem={renderItem}
        keyExtractor={({name, date}, index) => `${name}-${date}-${index}`}
      />
    </Container>
  );
};

export default TransactionList;
