import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';

import {Container} from './style';

import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';
import TransactionItem from '@/components/TransactionItem';

import {MEASURABLE_REWARD_POINT} from '@/constants/currency';
import {useTheme} from 'emotion-theming';

const flexEnd = {justifyContent: 'flex-end'};

const TransactionList = ({
  transactionsHistoryList,
  currencyCode,
  navigation,
  ...props
}) => {
  const theme = useTheme();
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
          coinBackgroundColor={
            currencyCode === MEASURABLE_REWARD_POINT
              ? theme.colors.secondary.normal
              : theme.colors.primary.normal
          }
          coin={
            currencyCode === MEASURABLE_REWARD_POINT ? (
              <MRPCoin
                amount={item.node.amount}
                size={16}
                fontSize={16}
                color={theme.colors.textOfMrp}
                style={flexEnd}
              />
            ) : (
              <MDTCoin
                amount={item.node.amount}
                size={16}
                fontSize={16}
                color={theme.colors.textOfMdt}
                style={flexEnd}
              />
            )
          }
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <FlatList
        data={transactionsHistoryList}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.id}
        onEndReachedThreshold={0.1}
        {...props}
      />
    </Container>
  );
};

export default TransactionList;
