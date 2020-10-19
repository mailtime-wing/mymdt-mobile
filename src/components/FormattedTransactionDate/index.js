import React from 'react';
import {FormattedDate} from 'react-intl';

const FormattedTransactionDate = ({dateTime}) => (
  <FormattedDate value={dateTime} year="numeric" month="long" day="2-digit" />
);

export default FormattedTransactionDate;
