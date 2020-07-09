import React from 'react';
import {FormattedMessage, FormattedDate} from 'react-intl';

import {
  Container, 
  TransactionContainer,
  RowContainer, 
  Name, 
  Date
} from './style';

import MDTCoin from '@/components/MDTCoin';

const flexEnd = {justifyContent: 'flex-end'};

const MDTTransactionHistory = ({transactionsHistoryList}) => (
  <Container>
    {transactionsHistoryList.map(({icon, name, date, amount}, index) => {
      return (
        <RowContainer
          key={`mdt-${name}-${date}-${index}`}
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
          <MDTCoin
            amount={amount}
            size={16}
            fontSize={16}
            color={props => props.theme.colors.primary.dark}
            style={flexEnd}
          />
        </RowContainer>
      );
    })}
  </Container>
);

export default MDTTransactionHistory;
