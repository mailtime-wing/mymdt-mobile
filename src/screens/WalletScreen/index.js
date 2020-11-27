import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {TRANSACTIONS_QUERY} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useCurrencyConvertToUsd from '@/hooks/useCurrencyConvertToUsd';
import {useTheme} from 'emotion-theming';
import Config from 'react-native-config';

import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';
import LoadingSpinner from '@/components/LoadingSpinner';
import QuickActions from '@/components/QuickActions';

import ConvertIcon from '@/assets/convert_icon.svg';
// import GiftIcon from '@/assets/gift_icon.svg';
import WithdrawalIcon from '@/assets/icon_upload.svg';
import StakeMdtIcon from '@/assets/icon_download.svg';
// import MyMdtIcon from '@/assets/mymdt_icon.svg';
import {FormattedMessage} from 'react-intl';
import ScreenContainer from '@/components/ScreenContainer';
import LinearGradientBackground from '@/components/LinearGradientBackground';

import {
  REWARD_DOLLAR,
  MEASURABLE_DATA_TOKEN,
  ME,
  USD,
  USDT,
} from '@/constants/currency';

import ArrowIcon from '@/assets/list_arrow.svg';

import {
  container,
  scrollContainer,
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
  const {data, loading, refetch} = useQueryWithAuth(TRANSACTIONS_QUERY, {
    fetchPolicy: 'network-only',
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const rdAmount =
    data?.userProfile?.currencyAccounts.find(
      (ca) => ca.currencyCode === REWARD_DOLLAR,
    )?.balance || 0;
  const mdtAmount =
    data?.userProfile?.currencyAccounts.find(
      (ca) => ca.currencyCode === MEASURABLE_DATA_TOKEN,
    )?.balance || 0;
  const meAmount =
    data?.userProfile?.currencyAccounts.find((ca) => ca.currencyCode === ME)
      ?.balance || 0;
  const {conversionRate: rdToUsdRate} = useCurrencyConvertToUsd(REWARD_DOLLAR);
  const {conversionRate: mdtToUsdRate} = useCurrencyConvertToUsd(
    MEASURABLE_DATA_TOKEN,
  );
  const {conversionRate: meToUsdRate} = useCurrencyConvertToUsd(ME);
  const rdToUsdAmount = rdAmount * rdToUsdRate;
  const mdtToUsdAmount = mdtAmount * mdtToUsdRate;
  const meToUsdAmount = meAmount * meToUsdRate;
  const totalBalance = rdToUsdAmount + mdtToUsdAmount + meToUsdAmount;

  const quickActionList = [
    {
      name: 'Stake MDT',
      icon: StakeMdtIcon,
      action: () =>
        navigation.navigate('membership_detail', {showNextStaking: true}),
    },
    ...(Config.EXPERIMENTAL_FEATURE === 'true'
      ? [
          {
            name: 'Withdraw',
            icon: WithdrawalIcon,
            action: () => navigation.navigate('settings'),
          },
        ]
      : []),
    {
      name: 'Convert',
      icon: ConvertIcon,
      action: () =>
        navigation.navigate('converter', {
          initialFrom: ME,
          initialTo: REWARD_DOLLAR,
        }),
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
    <LinearGradientBackground
      colors={[
        theme.colors.secondary.walletBackground,
        theme.colors.secondary.walletBackground,
      ]}>
      <ScreenContainer
        hasTopBar
        headerTransparent
        style={scrollContainer(theme)}>
        <ScrollView>
          <View style={container(theme)}>
            <AppText variant="label" style={[total(theme), textAlignCenter]}>
              <FormattedMessage
                id="total_balance"
                defaultMessage="total balance"
              />
            </AppText>
            {loading ? (
              <LoadingSpinner color={theme.colors.background1} />
            ) : (
              <TransactionAmount
                amount={totalBalance}
                showDollarSign
                amountSizeVariant="largeProportional"
                unitColor={theme.colors.textOnThemeBackground.highEmphasis}
                unitVariant={USD}
                amountColor={theme.colors.textOnThemeBackground.highEmphasis}
                style={totalBalanceText}
              />
            )}
          </View>

          <TouchableOpacity style={currencyRow(theme)} onPress={handleMrpPress}>
            <AppText variant="subTitle2" style={currency(theme)}>
              <FormattedMessage
                id="currencyDisplayCode.RD"
                defaultMessage="Reward Dollar"
              />
            </AppText>
            {loading ? (
              <LoadingSpinner style={spinner} />
            ) : (
              <View style={amountContainer}>
                <TransactionAmount
                  amount={rdAmount}
                  amountSizeVariant="normal"
                  unitSizeVariant="small"
                  unitVariant={REWARD_DOLLAR}
                  unitColor={theme.colors.secondary.dark}
                  amountColor={theme.colors.textOnBackground.mediumEmphasis}
                  style={amount}
                />
                <TransactionAmount
                  amount={rdToUsdAmount}
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
              <FormattedMessage
                id="currencyDisplayCode.MDT"
                defaultMessage="MDT"
              />
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
                  amount={mdtToUsdAmount}
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
                    <FormattedMessage id="currencyDisplayCode.ME" defaultMessage="ME" />

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
              <FormattedMessage
                id="currencyDisplayCode.ME"
                defaultMessage="ME"
              />
            </AppText>
            {loading ? (
              <LoadingSpinner style={spinner} />
            ) : (
              <View style={amountContainer}>
                <TransactionAmount
                  amount={meAmount}
                  amountSizeVariant="normal"
                  unitSizeVariant="small"
                  unitVariant={ME}
                  amountColor={theme.colors.textOnBackground.mediumEmphasis}
                  unitColor={theme.colors.secondary.dark}
                  style={amount}
                />
                <TransactionAmount
                  amount={meToUsdAmount}
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
      </ScreenContainer>
    </LinearGradientBackground>
  );
};

export default WalletScreen;
