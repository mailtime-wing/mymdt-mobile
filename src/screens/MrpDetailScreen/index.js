import React from 'react';
import {View, ScrollView} from 'react-native';
import {TRANSACTIONS_QUERY} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import TransactionAmount from '@/components/TransactionAmount';
import LoadingSpinner from '@/components/LoadingSpinner';

import {MEASURABLE_REWARD_POINT, USD} from '@/constants/currency';

import SafeAreaView from 'react-native-safe-area-view';

import WithdrawalIcon from '@/assets/icon_upload.svg';
import DepositIcon from '@/assets/icon_download.svg';

import convertToUsdAmount from '@/utils/convertToUsdAmount';

import MrpTransactionHistory from './MrpTransactionHistory';

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

const MrpDetailScreen = ({navigation}) => {
  const theme = useTheme();
  const currencyCode = MEASURABLE_REWARD_POINT;

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
          Reward point balance
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
        <View style={rowContainer}>
          <AppButton
            variant="filled"
            sizeVariant="normal"
            colorVariant="secondaryDark"
            text="withdraw"
            svgIcon={WithdrawalIcon}
            style={marginRight}
            disabled={mrpAmount <= 0}
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
      <MrpTransactionHistory
        navigation={navigation}
        currencyCode={currencyCode}
        style={sectionMargin}
      />
    </ScrollView>
  );
};

export default MrpDetailScreen;
