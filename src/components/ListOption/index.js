import React from 'react';
import {Option, ListLabel, ListValue, RightSide} from './style';

import ArrowIcon from '@/assets/list_arrow.svg';

const ListOption = props => (
  <Option {...props}>
    <ListLabel>{props.label}</ListLabel>
    <RightSide>
      {!!props.value && <ListValue>{props.value}</ListValue>}
      <ArrowIcon />
    </RightSide>
  </Option>
);

export default ListOption;
