import React from 'react';
import {View, ScrollView} from 'react-native';
import {TRANSACTIONS_QUERY} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import TransactionAmount from '@/components/TransactionAmount';
import LoadingSpinner from '@/components/LoadingSpinner';

import {USD, MM} from '@/constants/currency';

import SafeAreaView from 'react-native-safe-area-view';

import WithdrawalIcon from '@/assets/icon_upload.svg';
import DepositIcon from '@/assets/icon_download.svg';

import convertToUsdAmount from '@/utils/convertToUsdAmount';

import NextStakeReward from './NextStakeReward';
import NewTokenTransactionHistory from './NewTokenTransactionHistory';
import {FormattedMessage} from 'react-intl';

import {
  container,
  total,
  totalBalance as totalBalanceText,
  textAlignCenter,
  amount,
  rowContainer,
  marginRight,
  sectionMargin,
} from './style';

const NewTokenDetailScreen = ({navigation}) => {
  const theme = useTheme();
  const currencyCode = 'USDT'; // TODO: change to newToken currencyCode when newToken avaliable
  const {data, loading} = useQueryWithAuth(TRANSACTIONS_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      currencyCode: currencyCode,
    },
  });
  const newTokenAmount =
    data?.userProfile?.currencyAccounts.find(
      (ca) => ca.currencyCode === currencyCode,
    )?.balance || 0;

  return (
    <ScrollView>
      <SafeAreaView style={container(theme)}>
        <AppText variant="label" style={[total(theme), textAlignCenter]}>
          <FormattedMessage id="currencies.mm" defaultMessage="MM" />{' '}
          <FormattedMessage id="total_balance" defaultMessage="total balance" />
        </AppText>
        {loading ? (
          <LoadingSpinner color={theme.colors.background1} />
        ) : (
          <>
            <TransactionAmount
              amount={newTokenAmount}
              amountSizeVariant="largeProportional"
              amountColor={theme.colors.textOnThemeBackground.highEmphasis}
              unitVariant={MM}
              unitColor={theme.colors.textOnThemeBackground.highEmphasis}
              style={totalBalanceText}
            />
            <TransactionAmount
              amount={convertToUsdAmount(newTokenAmount)}
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
        <View style={rowContainer}>
          <AppButton
            variant="filled"
            sizeVariant="normal"
            colorVariant="secondaryDark"
            text="withdraw"
            svgIcon={WithdrawalIcon}
            style={marginRight}
            disabled={newTokenAmount <= 0}
          />
          <AppButton
            variant="filled"
            sizeVariant="normal"
            colorVariant="secondaryDark"
            text="deposit"
            svgIcon={DepositIcon}
          />
        </View>
      </SafeAreaView>
      <NextStakeReward style={sectionMargin} />
      <NewTokenTransactionHistory
        navigation={navigation}
        currencyCode={currencyCode}
        style={sectionMargin}
      />
    </ScrollView>
  );
};

export default NewTokenDetailScreen;
