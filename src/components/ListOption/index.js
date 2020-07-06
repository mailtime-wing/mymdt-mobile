import React from 'react';
import {Option, ListLabel, ListValue, RightSide} from './style';

import ArrowIcon from '@/assets/list_arrow.svg';

const ListOption = ({label, value, ...props}) => (
  <Option {...props}>
    <ListLabel>{label}</ListLabel>
    <RightSide>
      {value && <ListValue>{value}</ListValue>}
      <ArrowIcon />
    </RightSide>
  </Option>
);

export default ListOption;
