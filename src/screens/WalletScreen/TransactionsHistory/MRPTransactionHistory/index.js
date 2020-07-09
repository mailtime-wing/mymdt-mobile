import React from 'react';
import {FormattedMessage, FormattedDate} from 'react-intl';

import {
  Container, 
  TransactionContainer,
  RowContainer, 
  Name, 
  Date
} from './style';

import MRPCoin from '@/components/MRPCoin';

const flexEnd = {justifyContent: 'flex-end'};

const MRPTransactionHistory = ({transactionsHistoryList}) => (
  <Container>
    {transactionsHistoryList.map(({icon, name, date, amount}, index) => {
      return (
        <RowContainer
          key={`mrp-${name}-${date}-${index}`}
        >
          {icon}
          <TransactionContainer>
            <Name>{name}</Name>
            <Date>
              <FormattedDate
                value={date}
                year="numeric"
                month="long"
                day="2-digit"
              />
            </Date>
          </TransactionContainer>
          <MRPCoin
            amount={amount}
            size={16}
            fontSize={16}
            color={props => props.theme.colors.secondary.superDark}
            style={flexEnd}
          />
        </RowContainer>
      );
    })}
  </Container>
);

export default MRPTransactionHistory;
