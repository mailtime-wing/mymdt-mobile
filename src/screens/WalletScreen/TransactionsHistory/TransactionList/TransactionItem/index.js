import React from 'react';
import {FormattedDate} from 'react-intl';

import {TransactionContainer, RowContainer, Name, Date} from './style';

const TransactionItem = ({icon, name, date, coin}) => (
  <RowContainer>
    {icon}
    <TransactionContainer>
      <Name>{name}</Name>
      <Date>
        <FormattedDate value={date} year="numeric" month="long" day="2-digit" />
      </Date>
    </TransactionContainer>
    {coin}
  </RowContainer>
);

export default TransactionItem;
