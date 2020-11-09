import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import {historyListContainer, noTransaction} from './style';
import TransactionList from './TransactionList';

import AppText from '@/components/AppText2';

const TransactionsHistory = ({
  transactionsHistoryList = [],
  currencyCode,
  headerComponent,
  style,
  ...props
}) => {
  const theme = useTheme();
  return (
    <View style={[historyListContainer, style]}>
      {headerComponent}
      {transactionsHistoryList.length > 0 ? (
        <TransactionList
          transactionsHistoryList={transactionsHistoryList}
          currencyCode={currencyCode}
          {...props}
        />
      ) : (
        <AppText variant="smallText" style={noTransaction(theme)}>
          No Transaction
        </AppText>
      )}
    </View>
  );
};

export default TransactionsHistory;
