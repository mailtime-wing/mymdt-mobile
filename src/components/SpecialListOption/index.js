import React from 'react';

import {RowContainer, RowText} from './style';

const SpecialListOption = ({label, value, ...props}) => (
  <RowContainer {...props}>
    <RowText>{label}</RowText>
    {value}
  </RowContainer>
);

export default SpecialListOption;
