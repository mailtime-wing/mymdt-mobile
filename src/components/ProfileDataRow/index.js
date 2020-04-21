import React from 'react';

import {RowContainer, View, Text} from './style';

const ProfileDataRow = ({label, value, ...props}) => (
  <RowContainer {...props}>
    <Text>{label}</Text>
    <View>{value}</View>
  </RowContainer>
);

export default ProfileDataRow;
