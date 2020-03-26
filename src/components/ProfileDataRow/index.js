import React from 'react';

import {RowContainer, View, Text} from './style';

const ProfileDataRow = ({label, value}) => (
  <RowContainer>
    <Text>{label}</Text>
    <View>{value}</View>
  </RowContainer>
);

export default ProfileDataRow;
