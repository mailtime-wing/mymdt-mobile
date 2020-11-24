import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import {historyListContainer, noTransaction} from './style';
import TransactionList from './TransactionList';

import AppText from '@/components/AppText2';
import {FormattedMessage} from 'react-intl';

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
          <FormattedMessage
            id="no_transaction"
            defaultMessage="No Transaction"
          />
        </AppText>
      )}
    </View>
  );
};

export default TransactionsHistory;
