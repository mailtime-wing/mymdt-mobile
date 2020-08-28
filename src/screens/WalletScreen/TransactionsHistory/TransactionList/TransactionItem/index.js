import React from 'react';
import {FormattedDate} from 'react-intl';

import AppText from '@/components/AppText2';

import {
  TransactionContainer,
  RowContainer,
  nameStyle,
  dateStyle,
} from './style';
import {useTheme} from 'emotion-theming';

const TransactionItem = ({icon, name, date, coin}) => {
  const theme = useTheme();
  return (
    <RowContainer>
      {icon}
      <TransactionContainer>
        <AppText variant="body1" style={nameStyle(theme)}>
          {name}
        </AppText>
        <AppText variant="caption" style={dateStyle(theme)}>
          <FormattedDate
            value={date}
            year="numeric"
            month="long"
            day="2-digit"
          />
        </AppText>
      </TransactionContainer>
      {coin}
    </RowContainer>
  );
};

export default TransactionItem;
