import React from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import SafeAreaView from 'react-native-safe-area-view';
import {useTheme} from 'emotion-theming';

import {TRANSACTIONS_QUERY} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';
import LoadingSpinner from '@/components/LoadingSpinner';
import {REWARD_DOLLAR, USD} from '@/constants/currency';
import convertToUsdAmount from '@/utils/convertToUsdAmount';

import MrpTransactionHistory from './MrpTransactionHistory';

import {
  container,
  total,
  totalBalance as totalBalanceText,
  textAlignCenter,
  amount,
  sectionMargin,
} from './style';

const MrpDetailScreen = ({navigation}) => {
  const theme = useTheme();
  const currencyCode = REWARD_DOLLAR;

  const {data, loading} = useQueryWithAuth(TRANSACTIONS_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      currencyCode: currencyCode,
    },
  });
  const mrpAmount =
    data?.userProfile?.currencyAccounts.find(
      (ca) => ca.currencyCode === currencyCode,
    )?.balance || 0;

  return (
    <ScrollView>
      <SafeAreaView style={container(theme)}>
        <AppText variant="label" style={[total(theme), textAlignCenter]}>
          <FormattedMessage
            id="currencyDisplayCode.RD"
            defaultMessage="Reward Dollar"
          />{' '}
          <FormattedMessage id="total_balance" defaultMessage="total balance" />
        </AppText>
        {loading ? (
          <LoadingSpinner color={theme.colors.background1} />
        ) : (
          <>
            <TransactionAmount
              amount={mrpAmount}
              amountSizeVariant="largeProportional"
              amountColor={theme.colors.textOnThemeBackground.highEmphasis}
              unitVariant={currencyCode}
              unitColor={theme.colors.textOnThemeBackground.highEmphasis}
              style={totalBalanceText}
            />
            <TransactionAmount
              amount={convertToUsdAmount(mrpAmount)}
              amountSizeVariant="small"
              unitSizeVariant="small"
              unitVariant={USD}
              showDollarSign
              showAlmostEqual
              unitColor={theme.colors.textOnThemeBackground.mediumEmphasis}
              amountColor={theme.colors.textOnThemeBackground.mediumEmphasis}
              style={amount}
            />
          </>
        )}
      </SafeAreaView>
      <MrpTransactionHistory
        navigation={navigation}
        currencyCode={currencyCode}
        style={sectionMargin}
      />
    </ScrollView>
  );
};

export default MrpDetailScreen;
