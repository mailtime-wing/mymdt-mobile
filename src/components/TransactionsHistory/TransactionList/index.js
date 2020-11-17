import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';

import {container} from './style';
import TransactionItem from '@/components/TransactionItem';
import TransactionAmount from '@/components/TransactionAmount';

const TransactionList = ({
  transactionsHistoryList,
  currencyCode,
  navigation,
  ...props
}) => {
  const renderItem = ({item}) => {
    const handleTransactionPress = () => {
      navigation.navigate('transaction_detail', {
        item: {...item, icon: null},
        currencyCode: currencyCode,
      });
    };

    return (
      <TouchableOpacity onPress={handleTransactionPress}>
        <TransactionItem
          icon={item.icon}
          title={item.node.title}
          date={item.node.transactionTime}
          coin={
            <TransactionAmount
              variant="to"
              unitSizeVariant="small"
              unitVariant={currencyCode}
              amount={item.node.amount}
            />
          }
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={container}>
      <FlatList
        data={transactionsHistoryList}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.id}
        onEndReachedThreshold={0.1}
        {...props}
      />
    </View>
  );
};

export default TransactionList;
