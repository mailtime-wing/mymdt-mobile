import React, {
  useLayoutEffect,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';
import {TRANSACTIONS_QUERY} from '@/api/data';
import {VirtualizedList, TouchableOpacity, Image, View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import useLazyQueryWithAuth from '@/hooks/useLazyQueryWithAuth';
import {MEASURABLE_REWARD_POINT} from '@/constants/currency';

import LinearGradient from 'react-native-linear-gradient';
import {
  image,
  banner,
  body,
  chip,
  currency as currencyStyle,
  amount as amountStyle,
  range as rangeStyle,
  firstChipMargin,
  historyHeaderContainer,
  cashBackTitle,
  background as historyBackground,
} from './style';

import {ThemeContext} from '@/context/theme';
import AppIcon from '@/components/AppIcon';
import AppText from '@/components/AppText2';
import MissingCartIcon from '@/assets/icon_missed-shopping-cart.svg';
import TransactionBottomSheet from '@/components/TransactionBottomSheet';

import TransactionsHistory from '@/components/TransactionsHistory';
import AppButton from '@/components/AppButton';
import BrandIcon from '@/components/BrandIcon';

const filterList = [
  [],
  ['foo@gmail.com', 'bar@gmail.com'],
  ['Mastercard (•••• 1001)', 'ABC Bank (•••• 1234)'],
];

const SummaryChip = ({currency, amount, range, style}) => {
  const theme = useTheme();
  return (
    <View style={[chip(theme), style]}>
      <AppText variant="unit11" style={currencyStyle(theme)}>
        {currency}
      </AppText>
      <AppText variant="digit16mono" style={amountStyle(theme)}>
        <FormattedNumber
          value={amount}
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </AppText>
      <AppText variant="smallText" style={rangeStyle(theme)}>
        {range}
      </AppText>
    </View>
  );
};

const CashBackSummaryScreen = ({navigation}) => {
  const theme = useTheme();
  const {isDark} = useContext(ThemeContext);
  const backgroundImg = isDark
    ? require('@/assets/cashback-history-background_dark.png')
    : require('@/assets/cashback-history-background.png');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  // TODO: use real data when have api (do not have cash back api this moment)
  // now: hardcode using MRP transaction data
  const [getTransactions, {data, fetchMore}] = useLazyQueryWithAuth(
    TRANSACTIONS_QUERY,
    {
      fetchPolicy: 'network-only',
    },
  );

  const currentCardData = data?.userProfile?.currencyAccounts[0];
  const currencyCode = MEASURABLE_REWARD_POINT;
  const cardTransactionsHistory = currentCardData?.transactions?.edges.map(
    (transaction) =>
      (transaction = {
        ...transaction,
        icon: (
          <BrandIcon
            sizeVariant="normal"
            ImgSrc={require('@/assets/netflix.png')}
          />
        ),
      }),
  );
  const pageInfo = currentCardData?.transactions.pageInfo;
  const filter = activeFilterIndex ? filterList[activeFilterIndex].value : null;

  useEffect(() => {
    getTransactions({
      variables: {
        currencyCode: MEASURABLE_REWARD_POINT,
      },
    });
  }, [getTransactions]);

  const handleFilterPress = () => {
    setShowBottomSheet(true);
  };

  const handleLayoutPress = () => {
    setShowBottomSheet(false);
  };

  const handleItemPress = (index) => {
    setActiveFilterIndex(index);
  };

  const onApplyPress = () => {
    getTransactions({
      variables: {
        ...(filter && {
          filter: {
            type: filter,
          },
        }),
        currencyCode: MEASURABLE_REWARD_POINT,
      },
    });

    setShowBottomSheet(false);
  };

  const onLoadMore = () => {
    if (!pageInfo?.hasNextPage) {
      return;
    }

    fetchMore({
      ...(filter && {
        filter: {
          type: filter,
        },
      }),
      variables: {
        currencyCode: MEASURABLE_REWARD_POINT,
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

  const handleMissingCartPress = useCallback(() => {
    navigation.navigate('missing_receipt');
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: {backgroundColor: theme.colors.cashBackSummaryBackground},
      headerBackground: () => (
        <LinearGradient
          colors={theme.colors.linearGradientBackground.cashBackSummary}
        />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleMissingCartPress}>
          <AppIcon
            sizeVariant="small"
            svgIcon={MissingCartIcon}
            color={theme.colors.contrastColor}
          />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    handleMissingCartPress,
    theme.colors.linearGradientBackground.cashBackSummary,
    theme.colors.cashBackSummaryBackground,
    theme.colors.contrastColor,
  ]);

  return (
    <>
      <VirtualizedList
        getItemCount={() => 0}
        ListHeaderComponent={
          <>
            <Image source={backgroundImg} resizeMode="cover" style={image} />
            <View style={body}>
              <SummaryChip
                currency="USD"
                amount={10.12}
                range={
                  <FormattedMessage
                    id="in_past_days"
                    defaultMessage="In Past {day} Days"
                    values={{
                      day: 7,
                    }}
                  />
                }
                style={firstChipMargin}
              />
              <SummaryChip
                currency="USD"
                amount={1234.21}
                range={
                  <FormattedMessage id="in_totals" defaultMessage="In Totals" />
                }
              />
              <Image
                style={banner}
                source={require('@/assets/upgrade_promotion_banner.png')}
                resizeMode="cover"
              />
            </View>
          </>
        }
        ListFooterComponent={
          <TransactionsHistory
            headerComponent={
              <View style={historyHeaderContainer(theme)}>
                <AppText variant="heading5" style={cashBackTitle(theme)}>
                  <FormattedMessage
                    id="cash_back_history"
                    defaultMessage="Cash Back History"
                  />
                </AppText>
                <AppButton
                  onPress={handleFilterPress}
                  variant="outlined"
                  sizeVariant="compact"
                  colorVariant="secondary"
                  text={<FormattedMessage id="button.filter" />}
                />
              </View>
            }
            currencyCode={currencyCode}
            navigation={navigation}
            transactionsHistoryList={cardTransactionsHistory}
            onEndReached={onLoadMore}
            style={historyBackground(theme)}
          />
        }
      />
      {showBottomSheet && (
        <TransactionBottomSheet
          title={<FormattedMessage id="filter_by" defaultMessage="Filter by" />}
          items={filterList}
          activeOptionIndex={activeFilterIndex}
          onLayoutPress={handleLayoutPress}
          onItemPress={handleItemPress}
          onApplyPress={onApplyPress}
        />
      )}
    </>
  );
};

export default CashBackSummaryScreen;
