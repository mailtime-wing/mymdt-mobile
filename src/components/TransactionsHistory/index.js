import React from 'react';
import {View} from 'react-native';

import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {historyListContainer} from './style';
import TransactionList from './TransactionList';

const TransactionsHistory = ({
  transactionsHistoryList,
  currencyCode,
  headerComponent,
  style,
  ...props
}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        css`
          ${theme.colors.elevatedBackground4}
        `,
        historyListContainer,
        style,
      ]}>
      {headerComponent}
      <TransactionList
        transactionsHistoryList={transactionsHistoryList}
        currencyCode={currencyCode}
        {...props}
      />
    </View>
  );
};

export default TransactionsHistory;
