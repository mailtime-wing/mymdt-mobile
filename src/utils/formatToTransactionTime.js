import React from 'react';
import {FormattedDate} from 'react-intl';

export default function formatToTransactionTime(dateTime) {
  return (
    <FormattedDate value={dateTime} year="numeric" month="long" day="2-digit" />
  );
}
