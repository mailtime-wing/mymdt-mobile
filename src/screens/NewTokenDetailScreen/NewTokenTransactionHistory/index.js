import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage} from 'react-intl';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {TRANSACTIONS_QUERY} from '@/api/data';

import TransactionsHistory from '@/components/TransactionsHistory';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import AppAvator from '@/components/AppAvator';

import LockIcon from '@/assets/icon_lock.svg';

import {
  historyHeaderContainer,
  cashBackTitle,
  background as historyBackground,
} from './style';

const NewTokenTransactionHistory = ({navigation, currencyCode, style}) => {
  const theme = useTheme();

  const {data, fetchMore} = useQueryWithAuth(TRANSACTIONS_QUERY, {
    variables: {
      currencyCode: currencyCode,
    },
    fetchPolicy: 'network-only',
  });

  const currentCardData = data?.userProfile?.currencyAccounts[0];
  const cardTransactionsHistory = currentCardData?.transactions?.edges.map(
    (transaction) =>
      (transaction = {
        ...transaction,
        icon: (
          <AppAvator
            variant="icon"
            sizeVariant="small"
            color={theme.colors.background1}
            backgroundColor={theme.colors.secondary.normal}
            svgIcon={LockIcon}
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

  return (
    <View style={style}>
      <TransactionsHistory
        headerComponent={
          <View style={historyHeaderContainer(theme)}>
            <AppText variant="heading5" style={cashBackTitle(theme)}>
              <FormattedMessage
                id="recent_transactions"
                defaultMessage="Recent Transactions"
              />
            </AppText>
            <AppButton
              // onPress={handleFilterPress}
              variant="transparent"
              sizeVariant="compact"
              colorVariant="secondary"
              text={<FormattedMessage id="button.more" />}
            />
          </View>
        }
        currencyCode={currencyCode}
        navigation={navigation}
        transactionsHistoryList={cardTransactionsHistory}
        onEndReached={onLoadMore}
        style={historyBackground(theme)}
      />
    </View>
  );
};

export default NewTokenTransactionHistory;
