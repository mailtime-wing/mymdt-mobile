import React from 'react';
import {FormattedDate} from 'react-intl';

const FormattedTransactionDate = ({props}) => (
  <FormattedDate year="numeric" month="long" day="2-digit" {...props} />
);

export default FormattedTransactionDate;
