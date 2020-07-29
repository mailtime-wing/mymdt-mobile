import React from 'react';
import {FormattedMessage} from 'react-intl';

import {
  HistoryListContainer,
  HistoryListHeader,
  FilterButton,
  FilterText,
} from './style';

import FilterIcon from '@/assets/filter.svg';

import ThemeButton from '@/components/ThemeButton';
import TransactionList from './TransactionList';

const TransactionsHistory = ({
  transactionsHistoryList,
  currentTheme,
  currentFilter,
  handleFilterPress,
  ...props
}) => {
  return (
    <HistoryListContainer>
      <HistoryListHeader>
        <FilterButton
          onPress={handleFilterPress}
          borderColor={currentTheme.borderColor}>
          <FilterIcon stroke={currentTheme.color} strokeWidth={2} />
          <FilterText
            numberOfLines={1}
            ellipsizeMode="tail"
            color={currentTheme.color}>
            {currentFilter}
          </FilterText>
        </FilterButton>
        <ThemeButton
          textStyle={`color: ${currentTheme.color}`}
          buttonStyle={`borderColor: ${currentTheme.borderColor}`}
          reverse
          small>
          <FormattedMessage
            id="missing_receipt"
            defaultMessage="missing receipt"
          />
        </ThemeButton>
      </HistoryListHeader>
      <TransactionList
        transactionsHistoryList={transactionsHistoryList}
        {...props}
      />
    </HistoryListContainer>
  );
};

export default TransactionsHistory;
