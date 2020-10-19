import React from 'react';
import {View, ScrollView} from 'react-native';
import ModalContainer from '@/components/ModalContainer';
import AppText from '@/components/AppText2';
import ConversionRate from '@/components/ConversionRate';
import TransactionItem from '@/components/TransactionItem';
import TransactitonType from '@/enum/transactionsType';
import ConvertIcon from '@/assets/convert_icon.svg';
import TransactionAmount from '@/components/TransactionAmount';
import FormattedTransactionDate from '@/components/FormattedTransactionDate';

import {
  section,
  sectionHeader,
  sectionHeaderContainer,
  title as titleStyle,
  detail,
  item as itemContainer,
  transactionItemStyle,
} from './style';

import {useTheme} from 'emotion-theming';

const RenderTransationDetail = ({transactionItem}) => {
  const {title, transactionTime} = transactionItem;
  const theme = useTheme();
  switch (transactionItem.type) {
    case TransactitonType.CHECK_IN:
      return (
        <View style={itemContainer}>
          <AppText variant="body1" style={titleStyle(theme)}>
            Check-in Reward
          </AppText>
          <AppText variant="body2" style={detail(theme)}>
            {transactionItem.amount}
          </AppText>
        </View>
      );
    case TransactitonType.REWARD:
      return (
        <>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              Reward Name
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              {title}
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              Redeem Time
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              <FormattedTransactionDate dateTime={transactionTime} />
            </AppText>
          </View>
        </>
      );
    case TransactitonType.CONVERSION:
      const {
        data: {conversionRate, from, to},
      } = transactionItem;
      return (
        <>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              Conversion Rate
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              <ConversionRate
                from={from}
                to={to}
                conversionRate={conversionRate}
              />
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              Conversion Time
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              <FormattedTransactionDate dateTime={transactionTime} />
            </AppText>
          </View>
        </>
      );
    case TransactitonType.CASH_BACK:
      return (
        <>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              Recipient
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              foobar@gmail.com
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              Email Title
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              Saturday Night Uber Trip
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              Sender
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              uber.hongkong@uber.com
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              Recipient
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              foobar@gmail.com
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              Receive Time
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              <FormattedTransactionDate dateTime={transactionTime} />
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              Cash Back Earned
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              <TransactionAmount
                variant="to"
                unitVariant="newToken"
                amount={123}
              />
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              Cash Back Rate
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              2%
            </AppText>
          </View>
        </>
      );
    default:
      return null;
  }
};

const TransactionDetailScreen = ({route}) => {
  const theme = useTheme();
  const {
    item: {node: transactionItem},
    currencyCode,
  } = route.params;

  return (
    <ModalContainer>
      <ScrollView>
        <View style={section}>
          <View style={sectionHeaderContainer(theme)}>
            <AppText variant="label" style={sectionHeader(theme)}>
              {transactionItem.type}
            </AppText>
          </View>
          <TransactionItem
            title={transactionItem.title}
            date={transactionItem.transactionTime}
            icon={ConvertIcon}
            coinBackgroundColor={theme.colors.secondary.normal}
            coin={
              <TransactionAmount
                variant={
                  currencyCode === transactionItem.data.from ? 'from' : 'to'
                }
                unitVariant={currencyCode}
                amount={transactionItem.amount}
              />
            }
            style={transactionItemStyle}
          />
        </View>
        <View style={section}>
          <View style={sectionHeaderContainer(theme)}>
            <AppText variant="label" style={sectionHeader(theme)}>
              detail
            </AppText>
          </View>
          <RenderTransationDetail transactionItem={transactionItem} />
        </View>
      </ScrollView>
    </ModalContainer>
  );
};

export default TransactionDetailScreen;
