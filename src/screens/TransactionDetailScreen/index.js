import React from 'react';
import {View} from 'react-native';
import ModalContainer from '@/components/ModalContainer';
import AppText from '@/components/AppText2';
import ConversionRate from '@/components/ConversionRate';
import formatToTransactionTime from '@/utils/formatToTransactionTime';

import TransactitonType from '@/enum/transactionsType';

import {
  section,
  sectionHeader,
  sectionHeaderContainer,
  title as titleStyle,
  detail,
  item as itemContainer,
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
            Check-in Day
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
              {formatToTransactionTime(transactionTime)}
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
              {formatToTransactionTime(transactionTime)}
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
  } = route.params;

  return (
    <ModalContainer>
      <View style={section}>
        <View style={sectionHeaderContainer(theme)}>
          <AppText variant="label" style={sectionHeader(theme)}>
            {transactionItem.type}
          </AppText>
        </View>
      </View>
      <View style={section}>
        <View style={sectionHeaderContainer(theme)}>
          <AppText variant="label" style={sectionHeader(theme)}>
            detail
          </AppText>
        </View>
        <RenderTransationDetail transactionItem={transactionItem} />
      </View>
    </ModalContainer>
  );
};

export default TransactionDetailScreen;
