import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {useTheme} from 'emotion-theming';
import Config from 'react-native-config';
import SafeAreaView from 'react-native-safe-area-view';
import {FormattedMessage} from 'react-intl';

import {TRANSACTIONS_QUERY} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import TransactionAmount from '@/components/TransactionAmount';
import LoadingSpinner from '@/components/LoadingSpinner';
import {MEASURABLE_DATA_TOKEN, USD} from '@/constants/currency';
import WithdrawalIcon from '@/assets/icon_upload.svg';
import DepositIcon from '@/assets/icon_download.svg';
import convertToUsdAmount from '@/utils/convertToUsdAmount';

import MdtStake from './MdtStake';
import MdtTransactionHistory from './MdtTransactionHistory';

import {
  container,
  total,
  totalBalance as totalBalanceText,
  textAlignCenter,
  amount,
  rowContainer,
  marginRight,
  banner,
  sectionMargin,
} from './style';

const MdtDetailScreen = ({navigation}) => {
  const theme = useTheme();
  const currencyCode = MEASURABLE_DATA_TOKEN;

  const {data, loading} = useQueryWithAuth(TRANSACTIONS_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      currencyCode: currencyCode,
    },
  });
  const mdtAmount =
    data?.userProfile?.currencyAccounts.find(
      (ca) => ca.currencyCode === currencyCode,
    )?.balance || 0;

  const staking = true; // TODO: get from api

  return (
    <ScrollView>
      <SafeAreaView style={container(theme)}>
        <AppText variant="label" style={[total(theme), textAlignCenter]}>
          <FormattedMessage id="currencyDisplayCode.MDT" defaultMessage="MDT" />{' '}
          <FormattedMessage id="total_balance" defaultMessage="total balance" />
        </AppText>
        {loading ? (
          <LoadingSpinner color={theme.colors.background1} />
        ) : (
          <>
            <TransactionAmount
              amount={mdtAmount}
              amountSizeVariant="largeProportional"
              amountColor={theme.colors.textOnThemeBackground.highEmphasis}
              unitVariant={currencyCode}
              unitColor={theme.colors.textOnThemeBackground.highEmphasis}
              style={totalBalanceText}
            />
            <TransactionAmount
              amount={convertToUsdAmount(mdtAmount)}
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
        {Config.EXPERIMENTAL_FEATURE === 'true' && (
          <View style={rowContainer}>
            <AppButton
              variant="filled"
              sizeVariant="normal"
              colorVariant="primaryDark"
              text="withdraw"
              svgIcon={WithdrawalIcon}
              style={marginRight}
              disabled={mdtAmount <= 0}
            />
            <AppButton
              variant="filled"
              sizeVariant="normal"
              colorVariant="primaryDark"
              text="deposit"
              svgIcon={DepositIcon}
            />
          </View>
        )}
      </SafeAreaView>
      {staking ? (
        <MdtStake
          style={sectionMargin}
          paPercentage={5}
          accuredRewardAmount={100}
          cumulativeRewardAmount={3000}
          availableMdt={mdtAmount}
        />
      ) : (
        <Image
          source={require('@/assets/stake_to_upgrade_banner.png')}
          style={banner}
        />
      )}
      <MdtTransactionHistory
        navigation={navigation}
        currencyCode={currencyCode}
        style={sectionMargin}
      />
    </ScrollView>
  );
};

export default MdtDetailScreen;
