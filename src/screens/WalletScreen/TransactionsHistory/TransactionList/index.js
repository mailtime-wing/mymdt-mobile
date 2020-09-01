import React from 'react';
import {FlatList} from 'react-native';

import {Container} from './style';

import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';
import TransactionItem from './TransactionItem';

import {MEASURABLE_REWARD_POINT} from '@/constants/currency';

const flexEnd = {justifyContent: 'flex-end'};

const TransactionList = ({transactionsHistoryList, cardType, ...props}) => {
  const renderItem = ({item}) => (
    <TransactionItem
      icon={item.icon}
      name={item.node.title}
      date={item.node.transactionTime}
      coin={
        cardType === MEASURABLE_REWARD_POINT ? (
          <MRPCoin
            amount={item.node.amount}
            size={16}
            fontSize={16}
            color={props => props.theme.colors.textOfMrp}
            style={flexEnd}
          />
        ) : (
          <MDTCoin
            amount={item.node.amount}
            size={16}
            fontSize={16}
            color={props => props.theme.colors.textOfMdt}
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
        keyExtractor={item => item.node.id}
        onEndReachedThreshold={0.1}
        {...props}
      />
    </Container>
  );
};

export default TransactionList;
