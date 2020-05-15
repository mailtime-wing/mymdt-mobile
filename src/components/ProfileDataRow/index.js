import React from 'react';

import {RowContainer, View, RowText} from './style';

const ProfileDataRow = ({label, value, ...props}) => (
  <RowContainer {...props}>
    <RowText>{label}</RowText>
    <View>{value}</View>
  </RowContainer>
);

export default ProfileDataRow;
