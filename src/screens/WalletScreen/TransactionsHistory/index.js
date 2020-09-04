import React from 'react';
import {View} from 'react-native';

import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';
import {FormattedMessage} from 'react-intl';

import {historyListHeader, historyListContainer} from './style';

import FilterIcon from '@/assets/filter.svg';

import {MEASURABLE_REWARD_POINT} from '@/constants/currency';
import AppButton from '@/components/AppButton';
import TransactionList from './TransactionList';

const TransactionsHistory = ({
  transactionsHistoryList,
  currentTheme,
  currentFilter,
  handleFilterPress,
  navigation,
  cardType,
  ...props
}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        css`
          ${theme.colors.elevatedBackground1}
        `,
        historyListContainer,
      ]}>
      <View style={historyListHeader(theme)}>
        <AppButton
          onPress={handleFilterPress}
          text={currentFilter}
          variant="outlined"
          sizeVariant="normal"
          colorVariant={
            cardType === MEASURABLE_REWARD_POINT ? 'secondary' : 'primary'
          }
          svgIcon={FilterIcon}
          numberOfLines={1}
          ellipsizeMode="tail"
        />
        <AppButton
          onPress={() => navigation.navigate('missing_receipt')}
          text={
            <FormattedMessage
              id="missing_receipt"
              defaultMessage="missing receipt"
            />
          }
          variant="outlined"
          sizeVariant="compact"
          colorVariant={
            cardType === MEASURABLE_REWARD_POINT ? 'secondary' : 'primary'
          }
        />
      </View>
      <TransactionList
        transactionsHistoryList={transactionsHistoryList}
        cardType={cardType}
        {...props}
      />
    </View>
  );
};

export default TransactionsHistory;
