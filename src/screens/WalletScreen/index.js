import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {TRANSACTIONS_QUERY} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';
import LoadingSpinner from '@/components/LoadingSpinner';
import QuickActions from '@/components/QuickActions';

import DollarSignIcon from '@/assets/dollar_sign_icon';
import ConvertIcon from '@/assets/convert_icon.svg';
// import GiftIcon from '@/assets/gift_icon.svg';
import WithdrawalIcon from '@/assets/icon_upload.svg';
import StakeMdtIcon from '@/assets/icon_download.svg';
// import MyMdtIcon from '@/assets/mymdt_icon.svg';
import {FormattedMessage} from 'react-intl';

import {
  REWARD_DOLLAR,
  MEASURABLE_DATA_TOKEN,
  ME,
  USDT,
} from '@/constants/currency';

import SafeAreaView from 'react-native-safe-area-view';
import convertToUsdAmount from '@/utils/convertToUsdAmount';

import ArrowIcon from '@/assets/list_arrow.svg';

import {
  container,
  total,
  totalBalance as totalBalanceText,
  textAlignCenter,
  currencyRow,
  currency,
  amount,
  amountContainer,
  lastCurrencyRow,
  arrow,
  spinner,
  // payout,
  sectionMargin,
} from './style';

const WalletScreen = ({navigation}) => {
  const theme = useTheme();
  const {data, loading} = useQueryWithAuth(TRANSACTIONS_QUERY, {
    fetchPolicy: 'network-only',
  });
  const rpAmount =
    data?.userProfile?.currencyAccounts.find(
      (ca) => ca.currencyCode === REWARD_DOLLAR,
    )?.balance || 0;
  const mdtAmount =
    data?.userProfile?.currencyAccounts.find(
      (ca) => ca.currencyCode === MEASURABLE_DATA_TOKEN,
    )?.balance || 0;
  const ntAmount =
    data?.userProfile?.currencyAccounts.find((ca) => ca.currencyCode === ME)
      ?.balance || 0;
  const totalBalance = mdtAmount + ntAmount;
  // const earnedMM = 40; // TODO: get from api

  const quickActionList = [
    {
      name: 'Stake MDT',
      icon: StakeMdtIcon,
      action: () => navigation.navigate('settings'),
    },
    {
      name: 'Withdraw',
      icon: WithdrawalIcon,
      action: () => navigation.navigate('settings'),
    },
    {
      name: 'Convert',
      icon: ConvertIcon,
      action: () =>
        navigation.navigate('converter', {
          initialFrom: MEASURABLE_DATA_TOKEN,
          initialTo: REWARD_DOLLAR,
        }),
    },
    {
      name: 'Cashback type',
      icon: DollarSignIcon,
      action: () => navigation.navigate('settings'),
    },
  ];

  const handleMrpPress = () => {
    navigation.navigate('mrp_detail');
  };

  const handleMdtPress = () => {
    navigation.navigate('mdt_detail');
  };

  const handleNewTokenPress = () => {
    navigation.navigate('newToken_detail');
  };

  return (
    <ScrollView>
      <SafeAreaView style={container(theme)}>
        <AppText variant="label" style={[total(theme), textAlignCenter]}>
          <FormattedMessage id="total_balance" defaultMessage="total balance" />
        </AppText>
        {loading ? (
          <LoadingSpinner color={theme.colors.background1} />
        ) : (
          <TransactionAmount
            amount={totalBalance}
            showDollarSign
            amountSizeVariant="largeProportional"
            unitColor={theme.colors.textOnThemeBackground.highEmphasis}
            amountColor={theme.colors.textOnThemeBackground.highEmphasis}
            style={totalBalanceText}
          />
        )}
      </SafeAreaView>
      <TouchableOpacity style={currencyRow(theme)} onPress={handleMrpPress}>
        <AppText variant="subTitle2" style={currency(theme)}>
          <FormattedMessage id="currencies.rd" defaultMessage="Reward Dollar" />
        </AppText>
        {loading ? (
          <LoadingSpinner style={spinner} />
        ) : (
          <View style={amountContainer}>
            <TransactionAmount
              amount={rpAmount}
              amountSizeVariant="normal"
              unitSizeVariant="small"
              unitVariant={REWARD_DOLLAR}
              unitColor={theme.colors.secondary.dark}
              amountColor={theme.colors.textOnBackground.mediumEmphasis}
              style={amount}
            />
            <TransactionAmount
              amount={convertToUsdAmount(rpAmount)}
              amountSizeVariant="small"
              unitSizeVariant="small"
              unitVariant={USDT}
              showDollarSign
              showAlmostEqual
              unitColor={theme.colors.textOnBackground.mediumEmphasis}
              amountColor={theme.colors.textOnBackground.mediumEmphasis}
              style={amount}
            />
          </View>
        )}
        <ArrowIcon
          stroke={theme.colors.textOnBackground.mediumEmphasis}
          style={arrow}
        />
      </TouchableOpacity>
      <TouchableOpacity style={currencyRow(theme)} onPress={handleMdtPress}>
        <AppText variant="subTitle2" style={currency(theme)}>
          <FormattedMessage id="currencies.mdt" defaultMessage="MDT" />
        </AppText>
        {loading ? (
          <LoadingSpinner style={spinner} />
        ) : (
          <View style={amountContainer}>
            <TransactionAmount
              amount={mdtAmount}
              amountSizeVariant="normal"
              unitSizeVariant="small"
              unitVariant={MEASURABLE_DATA_TOKEN}
              amountColor={theme.colors.textOnBackground.mediumEmphasis}
              unitColor={theme.colors.secondary.dark}
              style={amount}
            />
            <TransactionAmount
              amount={convertToUsdAmount(mdtAmount)}
              amountSizeVariant="small"
              unitSizeVariant="small"
              unitVariant={USDT}
              showDollarSign
              showAlmostEqual
              unitColor={theme.colors.textOnBackground.mediumEmphasis}
              amountColor={theme.colors.textOnBackground.mediumEmphasis}
              style={amount}
            />
            {/* <AppText variant="digit12mono" style={payout(theme)}>
              <FormattedMessage
                id="earned_amount_and_payout_in_days"
                defaultMessage="Earned {amount}{currency} (Payout in {day} days)"
                values={{
                  amount: earnedMM,
                  currency: (
                    <FormattedMessage id="currencies.me" defaultMessage="ME" />
                  ),
                  day: 7,
                }}
              />
            </AppText> */}
          </View>
        )}
        <ArrowIcon
          stroke={theme.colors.textOnBackground.mediumEmphasis}
          style={arrow}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[currencyRow(theme), lastCurrencyRow]}
        onPress={handleNewTokenPress}>
        <AppText variant="subTitle2" style={currency(theme)}>
          <FormattedMessage id="currencies.me" defaultMessage="ME" />
        </AppText>
        {loading ? (
          <LoadingSpinner style={spinner} />
        ) : (
          <View style={amountContainer}>
            <TransactionAmount
              amount={ntAmount}
              amountSizeVariant="normal"
              unitSizeVariant="small"
              unitVariant={ME}
              amountColor={theme.colors.textOnBackground.mediumEmphasis}
              unitColor={theme.colors.secondary.dark}
              style={amount}
            />
            <TransactionAmount
              amount={convertToUsdAmount(ntAmount)}
              amountSizeVariant="small"
              unitSizeVariant="small"
              unitVariant={USDT}
              showDollarSign
              showAlmostEqual
              unitColor={theme.colors.textOnBackground.mediumEmphasis}
              amountColor={theme.colors.textOnBackground.mediumEmphasis}
              style={amount}
            />
          </View>
        )}
        <ArrowIcon
          stroke={theme.colors.textOnBackground.mediumEmphasis}
          style={arrow}
        />
      </TouchableOpacity>
      <QuickActions actionList={quickActionList} style={sectionMargin} />
    </ScrollView>
  );
};

export default WalletScreen;
