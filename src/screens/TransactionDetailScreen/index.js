import React from 'react';
import {View, ScrollView} from 'react-native';
import AppText from '@/components/AppText2';
import ConversionRate from '@/components/ConversionRate';
import TransactionItem from '@/components/TransactionItem';
import TransactitonType from '@/enum/transactionsType';
import ConvertIcon from '@/assets/convert_icon.svg';
import TransactionAmount from '@/components/TransactionAmount';
import FormattedTransactionDate from '@/components/FormattedTransactionDate';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import BrandIcon from '@/components/BrandIcon';
import {GET_MERCHANTS_API} from '@/api/data';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {ME} from '@/constants/currency';
import transactionTypeToIconAndName from '@/utils/transactionTypeToIconAndName';

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
            <FormattedMessage
              id="check_in_reward"
              defaultMessage="Check-in Reward"
            />
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
              <FormattedMessage id="reward_name" defaultMessage="Reward Name" />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              {title}
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage id="redeem_time" defaultMessage="Redeem Time" />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              <FormattedTransactionDate value={transactionTime} />
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
              <FormattedMessage
                id="conversion_rate"
                defaultMessage="Conversion Rate"
              />
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
              <FormattedMessage
                id="conversion_time"
                defaultMessage="Conversion Time"
              />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              <FormattedTransactionDate value={transactionTime} />
            </AppText>
          </View>
        </>
      );
    case TransactitonType.MAI:
      return (
        <>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage id="recipient" defaultMessage="Recipient" />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              {transactionItem.data.email}
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage id="email_title" defaultMessage="Email Title" />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              {transactionItem.data.emailSubject}
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage id="sender" defaultMessage="Sender" />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              {transactionItem.data.senderEmail}
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage
                id="receive_time"
                defaultMessage="Receive Time"
              />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              <FormattedTransactionDate
                value={transactionItem.data.receiveTime}
              />
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage id="amount" defaultMessage="Amount" />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              <FormattedMessage
                id="currencyDisplayCode.USD"
                defaultMessage="USD"
              />{' '}
              $<FormattedNumber value={transactionItem.data.amount} />
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage
                id="cashback_rate"
                defaultMessage="Cash Back Rate"
              />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              {transactionItem.cashbackRate * 100}%
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage
                id="cashback_earned"
                defaultMessage="Cash Back Earned"
              />
            </AppText>
            <TransactionAmount
              amount={transactionItem.amount}
              unitVariant={ME}
              unitSizeVariant="small"
              amountSizeVariant="normal"
              unitColor={theme.colors.primary.normal}
              amountColor={theme.colors.primary.normal}
              showPositiveSign={true}
            />
          </View>
        </>
      );
    case TransactitonType.BANK:
      return (
        <>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage
                id="credit_card_number"
                defaultMessage="Credit Card Number"
              />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              •••• {transactionItem.data.mask}
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage id="card_type" defaultMessage="Card Type" />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              {transactionItem.data.subType}
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage id="amount" defaultMessage="Amount" />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              <FormattedMessage
                id="currencyDisplayCode.USD"
                defaultMessage="USD"
              />{' '}
              $<FormattedNumber value={transactionItem.data.amount} />
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage
                id="cashback_rate"
                defaultMessage="Cash Back Rate"
              />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              {transactionItem.cashbackRate * 100}%
            </AppText>
          </View>
          <View style={itemContainer}>
            <AppText variant="body1" style={titleStyle(theme)}>
              <FormattedMessage
                id="cashback_earned"
                defaultMessage="Cash Back Earned"
              />
            </AppText>
            <AppText variant="body2" style={detail(theme)}>
              <TransactionAmount
                amount={transactionItem.amount}
                unitVariant={ME}
                unitSizeVariant="small"
                amountSizeVariant="normal"
                unitColor={theme.colors.primary.normal}
                amountColor={theme.colors.primary.normal}
                showPositiveSign={true}
              />
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
  const {data: merchantsData} = useQueryWithAuth(GET_MERCHANTS_API);
  const {
    item: {node: transactionItem},
    currencyCode,
  } = route.params;

  return (
    <ScrollView>
      <View style={section}>
        <View style={sectionHeaderContainer(theme)}>
          <AppText variant="label" style={sectionHeader(theme)}>
            {
              transactionTypeToIconAndName(
                transactionItem.type,
                transactionItem.amount,
              ).name
            }
          </AppText>
        </View>
        <TransactionItem
          title={transactionItem.title}
          date={transactionItem.transactionTime}
          icon={
            transactionItem.type === TransactitonType.MAI ||
            transactionItem.type === TransactitonType.BANK ? (
              <BrandIcon
                sizeVariant="small"
                ImgSrc={{
                  uri: merchantsData?.merchants.find(
                    (merchant) => merchant.name === transactionItem.title,
                  ).logo,
                }}
              />
            ) : (
              ConvertIcon
            )
          }
          coinBackgroundColor={theme.colors.secondary.normal}
          coin={
            <TransactionAmount
              amount={transactionItem.amount}
              variant={
                currencyCode === transactionItem.data?.from ? 'from' : 'to'
              }
              amountColor={
                (transactionItem.type === TransactitonType.MAI ||
                  transactionItem.type === TransactitonType.BANK) &&
                theme.colors.primary.normal
              }
              unitColor={
                (transactionItem.type === TransactitonType.MAI ||
                  transactionItem.type === TransactitonType.BANK) &&
                theme.colors.primary.normal
              }
              unitVariant={currencyCode}
              unitSizeVariant="small"
              showPositiveSign={true}
            />
          }
          hideDivider
          style={transactionItemStyle}
        />
      </View>
      <View style={section}>
        <View style={sectionHeaderContainer(theme)}>
          <AppText variant="label" style={sectionHeader(theme)}>
            <FormattedMessage id="detail" defaultMessage="Detail" />
          </AppText>
        </View>
        <RenderTransationDetail transactionItem={transactionItem} />
      </View>
    </ScrollView>
  );
};

export default TransactionDetailScreen;
