import React from 'react';

import useQueryWithAuth from '@/hooks/useQueryWithAuth';

import {TRANSACTIONS_QUERY} from '@/api/data';
import transactionTypeToIconAndName from '@/utils/transactionTypeToIconAndName';
import AppAvator from '@/components/AppAvator';
import TransactionsHistory from '@/components/TransactionsHistory';
import LoadingSpinner from '@/components/LoadingSpinner';

import {useTheme} from 'emotion-theming';

const TransactionDetailMoreScreen = ({navigation, route}) => {
  const theme = useTheme();
  const {currencyCode, iconColor} = route.params;
  const {data, loading, fetchMore} = useQueryWithAuth(TRANSACTIONS_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      currencyCode: currencyCode,
    },
  });

  const currentCardData = data?.userProfile?.currencyAccounts[0];
  const transactionsHistory = currentCardData?.transactions?.edges.map(
    (transaction) =>
      (transaction = {
        ...transaction,
        icon: (
          <AppAvator
            variant="icon"
            sizeVariant="small"
            color={theme.colors.background1}
            backgroundColor={iconColor}
            svgIcon={
              transactionTypeToIconAndName(
                transaction.node?.type,
                transaction.node?.amount || 0,
              ).icon
            }
          />
        ),
      }),
  );

  const pageInfo = currentCardData?.transactions.pageInfo;

  const onLoadMore = () => {
    if (!pageInfo?.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        currencyCode: currencyCode,
        cursor: pageInfo.endCursor,
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        if (
          !fetchMoreResult?.userProfile?.currencyAccounts?.[0]?.transactions
            ?.edges?.length
        ) {
          return previousResult;
        }

        const newData = JSON.parse(JSON.stringify(fetchMoreResult));

        newData.userProfile.currencyAccounts[0].transactions.edges = [
          ...previousResult.userProfile.currencyAccounts[0].transactions.edges,
          ...fetchMoreResult.userProfile.currencyAccounts[0].transactions.edges,
        ];

        return newData;
      },
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <TransactionsHistory
      transactionsHistoryList={transactionsHistory}
      currencyCode={currencyCode}
      navigation={navigation}
      onEndReached={onLoadMore}
    />
  );
};

export default TransactionDetailMoreScreen;
