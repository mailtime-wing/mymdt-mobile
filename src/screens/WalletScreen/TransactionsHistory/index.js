import React from 'react';

import {
  HistoryListContainer,
  HistoryListHeader,
  FilterButton,
  FilterText,
} from './style';

import {MEASURABLE_REWARD_POINT, MEASURABLE_DATA_TOKEN,} from '@/constants/currency'

import FilterIcon from '@/assets/filter.svg';

import ThemeButton from '@/components/ThemeButton';
import MRPTransactionHistory from './MRPTransactionHistory';
import MDTTransactionHistory from './MDTTransactionHistory';

const TransactionsHistory = ({cardType, transactionsHistoryList, currentTheme}) => {
  return (
    <HistoryListContainer>
      <HistoryListHeader>
        <FilterButton>
          <FilterIcon stroke={currentTheme.color} strokeWidth={2}/>
          <FilterText color={currentTheme.color}>ALL</FilterText>
        </FilterButton>
        <ThemeButton style={currentTheme} reverse small>
          missing receipt
        </ThemeButton>
      </HistoryListHeader>
      {cardType === MEASURABLE_REWARD_POINT && <MRPTransactionHistory transactionsHistoryList={transactionsHistoryList}/>}
      {cardType === MEASURABLE_DATA_TOKEN && <MDTTransactionHistory transactionsHistoryList={transactionsHistoryList}/>}
    </HistoryListContainer>
  );
};

export default TransactionsHistory;
