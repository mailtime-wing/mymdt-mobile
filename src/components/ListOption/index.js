import React from 'react';
import {Option, ListLabel, ListValue, RightSide, Margin} from './style';

import ArrowIcon from '@/assets/list_arrow.svg';

const ListOption = ({label, value, noIcon, ...props}) => (
  <Option {...props}>
    <ListLabel>{label}</ListLabel>
    <RightSide>
      {value && <ListValue>{value}</ListValue>}
      {noIcon ? null : (
        <>
          <Margin />
          <ArrowIcon />
        </>
      )}
    </RightSide>
  </Option>
);

export default ListOption;
