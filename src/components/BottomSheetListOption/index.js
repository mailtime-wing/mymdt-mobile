import React from 'react';
import {Option, ListLabel, ListValue, RightSide} from './style';

import TickIcon from '@/assets/tick.svg';

const BottomSheetListOption = ({label, value, active, ...props}) => (
  <Option active={active} {...props}>
    <ListLabel>{label}</ListLabel>
    <RightSide>
      {value && <ListValue>{value}</ListValue>}
      {active && <TickIcon />}
    </RightSide>
  </Option>
);

export default BottomSheetListOption;
